const roomsService = require("../services/rooms.service");

async function getRooms(req, res) {
  try {
    const rooms = await roomsService.getAllRooms();

    res.json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    console.error("Get rooms error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data kamar",
    });
  }
}

module.exports = {
  getRooms,
};