import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Neon Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Signup route
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (email, password) VALUES ($1,$2)", [email, hash]);
    res.json({ success: true });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Log activity (requires auth)
app.post("/api/activity", authenticateToken, async (req, res) => {
  const { date, hoursPlayed } = req.body;
  const userId = req.user.userId;
  try {
    await pool.query(
      `INSERT INTO activity (user_id, date, hours_played)
       VALUES ($1,$2,$3)
       ON CONFLICT (user_id,date)
       DO UPDATE SET hours_played = activity.hours_played + $3`,
      [userId, date, hoursPlayed]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Activity log error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Fetch activity (requires auth)
app.get("/api/activity", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const { rows } = await pool.query("SELECT * FROM activity WHERE user_id=$1", [userId]);
    res.json(rows);
  } catch (err) {
    console.error("Activity fetch error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));