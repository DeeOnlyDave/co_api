const express = require("express");
const { Pool } = require("pg"); // PostgreSQL client

const app = express();
app.use(express.json());

// Load the database URL from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use Render's env variable
  ssl: { rejectUnauthorized: false }, // Required for Render databases
});

// Test the database connection
pool.connect()
  .then(() => console.log("Connected to the database ✅"))
  .catch(err => console.error("Database connection error ❌", err));

// GET: Fetch all items
app.get("/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items"); // Replace 'items' with your table name
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Insert a new item
app.post("/items", async (req, res) => {
  const { name, value } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO items (name, value) VALUES ($1, $2) RETURNING *",
      [name, value]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
