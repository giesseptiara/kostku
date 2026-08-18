const adminService = require("../services/admin.service");

async function createAdmin(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, dan password wajib diisi",
      });
    }

    const admin = await adminService.createAdmin(
      name,
      email,
      password
    );

    res.status(201).json({
      success: true,
      message: "Admin berhasil dibuat",
      data: admin,
    });
  } catch (error) {
    console.error("Create admin error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal membuat admin",
    });
  }
}

module.exports = {
  createAdmin,
};