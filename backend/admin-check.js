const path = require("path");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkAdmin() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        password_hash,
        created_at
      FROM admins
      ORDER BY id;
    `);

    console.table(result.rows);
  } catch (error) {
    console.error("Database error:", error.message);
  } finally {
    await pool.end();
  }
}

checkAdmin();