const pool = require("../config/database");

async function getAllGallery() {
  const result = await pool.query(`
    SELECT
      id,
      title,
      image_url,
      description,
      created_at
    FROM gallery
    ORDER BY id;
  `);

  return result.rows;
}

module.exports = {
  getAllGallery,
};