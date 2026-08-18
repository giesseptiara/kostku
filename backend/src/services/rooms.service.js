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

async function createRoom(name, description, price, status, size) {
  const result = await pool.query(
    `
    INSERT INTO rooms
      (name, description, price, status, size)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING
      id,
      name,
      description,
      price,
      status,
      size,
      created_at,
      updated_at;
    `,
    [name, description, price, status, size]
  );

  return result.rows[0];
}

async function updateRoom(id, name, description, price, status, size) {
  const result = await pool.query(
    `
    UPDATE rooms
    SET
      name = $1,
      description = $2,
      price = $3,
      status = $4,
      size = $5,
      updated_at = NOW()
    WHERE id = $6
    RETURNING
      id,
      name,
      description,
      price,
      status,
      size,
      created_at,
      updated_at;
    `,
    [name, description, price, status, size, id]
  );

  return result.rows[0];
}

async function deleteRoom(id) {
  const result = await pool.query(
    `
    DELETE FROM rooms
    WHERE id = $1
    RETURNING id;
    `,
    [id]
  );

  return result.rows[0];
}

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};