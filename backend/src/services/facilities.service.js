const pool = require("../config/database");

async function getAllFacilities() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      description,
      icon,
      created_at
    FROM facilities
    ORDER BY id;
  `);

  return result.rows;
}

module.exports = {
  getAllFacilities,
};