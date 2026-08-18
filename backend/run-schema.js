const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runSchema() {
  try {
    const schema = fs.readFileSync(
      path.join(__dirname, "schema.sql"),
      "utf8"
    );

    await pool.query(schema);

    console.log("Database schema created successfully");
  } catch (error) {
    console.error("Schema creation failed:");
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

runSchema();