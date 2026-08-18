const path = require("path");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkData() {
  try {
    const kost = await pool.query(`
      SELECT id, name, city, price_start
      FROM kost_info
      ORDER BY id;
    `);

    const rooms = await pool.query(`
      SELECT id, name, price, status
      FROM rooms
      ORDER BY id;
    `);

    const facilities = await pool.query(`
      SELECT id, name
      FROM facilities
      ORDER BY id;
    `);

    const gallery = await pool.query(`
      SELECT id, title, image_url
      FROM gallery
      ORDER BY id;
    `);

    console.log("\n=== KOST INFO ===");
    console.table(kost.rows);

    console.log("\n=== ROOMS ===");
    console.table(rooms.rows);

    console.log("\n=== FACILITIES ===");
    console.table(facilities.rows);

    console.log("\n=== GALLERY ===");
    console.table(gallery.rows);
  } catch (error) {
    console.error("Database error:", error.message);
  } finally {
    await pool.end();
  }
}

checkData();