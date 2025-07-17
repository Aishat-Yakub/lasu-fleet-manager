// backend/index.js

const express   = require('express');
const cors      = require('cors');
const sqlite3   = require('sqlite3').verbose();
const multer    = require('multer');
const path      = require('path');

const app  = express();
const port = 3001;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve uploaded PDFs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Database Setup ───────────────────────────────────────────────────────────
const db = new sqlite3.Database('./fleet.db', err => {
  if (err) return console.error('❌ DB connection error:', err.message);
  console.log('✅ Connected to fleet.db SQLite database');
});

// Create vehicles table
db.run(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plateNumber TEXT,
    department TEXT,
    type TEXT,
    driver TEXT,
    condition TEXT,
    registrationExpiry TEXT,
    lastMaintenanceDate TEXT,
    notes TEXT
  )
`);

// Create fuel_logs table
db.run(`
  CREATE TABLE IF NOT EXISTS fuel_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicleId INTEGER,
    litres REAL,
    amount REAL,
    date TEXT,
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
  )
`);

// Create maintenance table
db.run(`
  CREATE TABLE IF NOT EXISTS maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicleId INTEGER,
    description TEXT,
    amount REAL,
    proofPath TEXT,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
  )
`);

// ── Multer Setup for PDF Uploads ─────────────────────────────────────────────
const upload = multer({
  dest: path.join(__dirname, 'uploads/'),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  }
});

// ── Routes ───────────────────────────────────────────────────────────────────

// GET all vehicles
app.get('/api/vehicles', (req, res) => {
  db.all('SELECT * FROM vehicles', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST new fuel log (with maintenance‑overdue warning)
app.post('/api/fuel', async (req, res) => {
  const { vehicleId, litres, amount, date } = req.body;

  try {
    // fetch lastMaintenanceDate
    const vehicle = await new Promise((resolve, reject) => {
      db.get(
        'SELECT lastMaintenanceDate FROM vehicles WHERE id = ?',
        [vehicleId],
        (err, row) => err ? reject(err) : resolve(row)
      );
    });
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    // calculate days since last maintenance
    const lastDate = new Date(vehicle.lastMaintenanceDate || Date.now());
    const daysDiff = Math.floor((Date.now() - lastDate.getTime()) / (1000*60*60*24));
    const warning  = daysDiff > 90
      ? `⚠️ Vehicle hasn't had maintenance in ${daysDiff} days.`
      : null;

    // insert fuel log
    db.run(
      'INSERT INTO fuel_logs (vehicleId, litres, amount, date) VALUES (?, ?, ?, ?)',
      [vehicleId, litres, amount, date],
      err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Fuel log recorded', warning });
      }
    );

  } catch (err) {
    console.error('Fuel log error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all fuel logs (joined with vehicle info)
app.get('/api/fuel', (req, res) => {
  const sql = `
    SELECT 
      f.id,
      f.litres,
      f.amount,
      f.date,
      v.plateNumber,
      v.department,
      v.condition
    FROM fuel_logs AS f
    JOIN vehicles  AS v ON f.vehicleId = v.id
    ORDER BY f.date DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST new maintenance request (with >2-in-30-days warning)
app.post(
  '/api/maintenance',
  upload.single('proof'),
  async (req, res) => {
    try {
      const { vehicleId, description, amount } = req.body;
      const proofPath = req.file.path;

      // count last 30 days
      const count30 = await new Promise((resolve, reject) => {
        db.get(
          `SELECT COUNT(*) AS cnt FROM maintenance
           WHERE vehicleId = ?
             AND date >= date('now','-30 days')`,
          [vehicleId],
          (err, row) => err ? reject(err) : resolve(row.cnt)
        );
      });

      const warning = count30 >= 2
        ? `⚠️ This vehicle has ${count30} maintenance requests in the last 30 days.`
        : null;

      // insert maintenance record
      db.run(
        `INSERT INTO maintenance (vehicleId, description, amount, proofPath)
         VALUES (?, ?, ?, ?)`,
        [vehicleId, description, amount, proofPath],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Maintenance saved', warning });
        }
      );
    } catch (err) {
      console.error('Maintenance error:', err);
      res.status(500).json({ error: err.message });
    }
  }
);

// GET all maintenance records (joined with vehicle info)
app.get('/api/maintenance', (req, res) => {
  const sql = `
    SELECT m.id, m.description, m.amount, m.date,
           m.proofPath, v.plateNumber
    FROM maintenance AS m
    JOIN vehicles    AS v ON m.vehicleId = v.id
    ORDER BY m.date DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // add public URL for each proof
    const host = `http://localhost:${port}`;
    const updated = rows.map(r => ({
      ...r,
      proofUrl: `${host}/${r.proofPath.replace(/\\/g, '/')}`
    }));

    res.json(updated);
  });
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
