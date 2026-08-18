const facilitiesService = require("../services/facilities.service");

async function getFacilities(req, res) {
  try {
    const facilities = await facilitiesService.getAllFacilities();

    res.json({
      success: true,
      data: facilities,
    });
  } catch (error) {
    console.error("Get facilities error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data fasilitas",
    });
  }
}

async function createFacility(req, res) {
  try {
    const {
      name,
      description,
      icon,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name wajib diisi",
      });
    }

    const facility = await facilitiesService.createFacility(
      name,
      description,
      icon
    );

    res.status(201).json({
      success: true,
      message: "Fasilitas berhasil dibuat",
      data: facility,
    });
  } catch (error) {
    console.error("Create facility error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal membuat fasilitas",
    });
  }
}

async function updateFacility(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      icon,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name wajib diisi",
      });
    }

    const facility = await facilitiesService.updateFacility(
      id,
      name,
      description,
      icon
    );

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Fasilitas tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Fasilitas berhasil diperbarui",
      data: facility,
    });
  } catch (error) {
    console.error("Update facility error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui fasilitas",
    });
  }
}

async function deleteFacility(req, res) {
  try {
    const { id } = req.params;

    const facility = await facilitiesService.deleteFacility(id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Fasilitas tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Fasilitas berhasil dihapus",
      data: facility,
    });
  } catch (error) {
    console.error("Delete facility error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus fasilitas",
    });
  }
}

module.exports = {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
};