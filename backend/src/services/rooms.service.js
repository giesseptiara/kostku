const pool = require("../config/database");

async function getAllRooms() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      description,
      price,
      status,
      size,
      created_at,
      updated_at
    FROM rooms
    ORDER BY id;
  `);

  return result.rows;
}

module.exports = {
  getAllRooms,
};