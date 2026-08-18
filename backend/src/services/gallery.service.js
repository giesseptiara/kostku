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

async function createGallery(title, image_url, description) {
  const result = await pool.query(
    `
    INSERT INTO gallery
      (title, image_url, description)
    VALUES
      ($1, $2, $3)
    RETURNING
      id,
      title,
      image_url,
      description,
      created_at;
    `,
    [title, image_url, description]
  );

  return result.rows[0];
}

async function updateGallery(id, title, image_url, description) {
  const result = await pool.query(
    `
    UPDATE gallery
    SET
      title = $1,
      image_url = $2,
      description = $3
    WHERE id = $4
    RETURNING
      id,
      title,
      image_url,
      description,
      created_at;
    `,
    [title, image_url, description, id]
  );

  return result.rows[0];
}

async function deleteGallery(id) {
  const result = await pool.query(
    `
    DELETE FROM gallery
    WHERE id = $1
    RETURNING id;
    `,
    [id]
  );

  return result.rows[0];
}

module.exports = {
  getAllGallery,
  createGallery,
  updateGallery,
  deleteGallery,
};