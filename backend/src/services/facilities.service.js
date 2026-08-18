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

async function createFacility(name, description, icon) {
  const result = await pool.query(
    `
    INSERT INTO facilities
      (name, description, icon)
    VALUES
      ($1, $2, $3)
    RETURNING
      id,
      name,
      description,
      icon,
      created_at;
    `,
    [name, description, icon]
  );

  return result.rows[0];
}

async function updateFacility(id, name, description, icon) {
  const result = await pool.query(
    `
    UPDATE facilities
    SET
      name = $1,
      description = $2,
      icon = $3
    WHERE id = $4
    RETURNING
      id,
      name,
      description,
      icon,
      created_at;
    `,
    [name, description, icon, id]
  );

  return result.rows[0];
}

async function deleteFacility(id) {
  const result = await pool.query(
    `
    DELETE FROM facilities
    WHERE id = $1
    RETURNING id;
    `,
    [id]
  );

  return result.rows[0];
}

module.exports = {
  getAllFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
};