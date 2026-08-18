const authService = require("../services/auth.service");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi",
      });
    }

    const result = await authService.loginAdmin(email, password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: result,
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}

async function me(req, res) {
  return res.status(200).json({
    success: true,
    message: "Token valid",
    data: {
      admin: req.admin,
    },
  });
}

module.exports = {
  login,
  me,
};