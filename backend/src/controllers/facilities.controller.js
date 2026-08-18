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

module.exports = {
  getFacilities,
};