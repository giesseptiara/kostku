const galleryService = require("../services/gallery.service");

async function getGallery(req, res) {
  try {
    const gallery = await galleryService.getAllGallery();

    res.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("Get gallery error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data gallery",
    });
  }
}

module.exports = {
  getGallery,
};