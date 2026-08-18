const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

async function loginAdmin(email, password) {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      password_hash
    FROM admins
    WHERE email = $1
    LIMIT 1;
    `,
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const admin = result.rows[0];

  const passwordValid = await bcrypt.compare(
    password,
    admin.password_hash
  );

  if (!passwordValid) {
    return null;
  }

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
    token,
  };
}

module.exports = {
  loginAdmin,
};