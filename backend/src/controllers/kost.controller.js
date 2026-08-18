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

async function updateKost(req, res) {
  try {
    const {
      name,
      description,
      address,
      city,
      price_start,
      whatsapp,
      latitude,
      longitude,
    } = req.body;

    if (!name || !address || !city || !price_start || !whatsapp) {
      return res.status(400).json({
        success: false,
        message:
          "Name, address, city, price_start, dan whatsapp wajib diisi",
      });
    }

    const kost = await kostService.updateKostInfo(
      name,
      description,
      address,
      city,
      price_start,
      whatsapp,
      latitude,
      longitude
    );

    if (!kost) {
      return res.status(404).json({
        success: false,
        message: "Informasi kost belum tersedia",
      });
    }

    res.json({
      success: true,
      message: "Informasi kost berhasil diperbarui",
      data: kost,
    });
  } catch (error) {
    console.error("Update kost error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui informasi kost",
    });
  }
}

module.exports = {
  getKost,
  updateKost,
};