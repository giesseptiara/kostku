const pool = require("../config/database");

async function getKostInfo() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      description,
      address,
      city,
      price_start,
      whatsapp,
      latitude,
      longitude,
      created_at,
      updated_at
    FROM kost_info
    ORDER BY id
    LIMIT 1;
  `);

  return result.rows[0];
}

module.exports = {
  getKostInfo,
};