const bcrypt = require("bcrypt");
const pool = require("../config/database");

async function createAdmin(name, email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO admins
      (name, email, password_hash)
    VALUES
      ($1, $2, $3)
    RETURNING
      id,
      name,
      email,
      created_at,
      updated_at;
    `,
    [name, email, passwordHash]
  );

  return result.rows[0];
}

module.exports = {
  createAdmin,
};