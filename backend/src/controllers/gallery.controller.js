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

async function createGallery(req, res) {
  try {
    const {
      title,
      image_url,
      description,
    } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({
        success: false,
        message: "Title dan image_url wajib diisi",
      });
    }

    const gallery = await galleryService.createGallery(
      title,
      image_url,
      description
    );

    res.status(201).json({
      success: true,
      message: "Gallery berhasil dibuat",
      data: gallery,
    });
  } catch (error) {
    console.error("Create gallery error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal membuat gallery",
    });
  }
}

async function updateGallery(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      image_url,
      description,
    } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({
        success: false,
        message: "Title dan image_url wajib diisi",
      });
    }

    const gallery = await galleryService.updateGallery(
      id,
      title,
      image_url,
      description
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Gallery berhasil diperbarui",
      data: gallery,
    });
  } catch (error) {
    console.error("Update gallery error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui gallery",
    });
  }
}

async function deleteGallery(req, res) {
  try {
    const { id } = req.params;

    const gallery = await galleryService.deleteGallery(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Gallery berhasil dihapus",
      data: gallery,
    });
  } catch (error) {
    console.error("Delete gallery error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus gallery",
    });
  }
}

module.exports = {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
};