const kostService = require("../services/kost.service");

async function getKost(req, res) {
  try {
    const kost = await kostService.getKostInfo();

    if (!kost) {
      return res.status(404).json({
        success: false,
        message: "Informasi kost belum tersedia",
      });
    }

    res.json({
      success: true,
      data: kost,
    });
  } catch (error) {
    console.error("Get kost error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil informasi kost",
    });
  }
}

module.exports = {
  getKost,
};