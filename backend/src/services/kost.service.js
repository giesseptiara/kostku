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

async function updateKostInfo(
  name,
  description,
  address,
  city,
  price_start,
  whatsapp,
  latitude,
  longitude
) {
  const result = await pool.query(
    `
    UPDATE kost_info
    SET
      name = $1,
      description = $2,
      address = $3,
      city = $4,
      price_start = $5,
      whatsapp = $6,
      latitude = $7,
      longitude = $8,
      updated_at = NOW()
    WHERE id = (
      SELECT id
      FROM kost_info
      ORDER BY id
      LIMIT 1
    )
    RETURNING
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
      updated_at;
    `,
    [
      name,
      description,
      address,
      city,
      price_start,
      whatsapp,
      latitude,
      longitude,
    ]
  );

  return result.rows[0];
}

module.exports = {
  getKostInfo,
  updateKostInfo,
};