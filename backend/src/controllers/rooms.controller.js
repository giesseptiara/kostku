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

async function createRoom(req, res) {
  try {
    const {
      name,
      description,
      price,
      status,
      size,
    } = req.body;

    if (!name || !price || !status) {
      return res.status(400).json({
        success: false,
        message: "Name, price, dan status wajib diisi",
      });
    }

    const room = await roomsService.createRoom(
      name,
      description,
      price,
      status,
      size
    );

    res.status(201).json({
      success: true,
      message: "Kamar berhasil dibuat",
      data: room,
    });
  } catch (error) {
    console.error("Create room error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal membuat kamar",
    });
  }
}

async function updateRoom(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      status,
      size,
    } = req.body;

    if (!name || !price || !status) {
      return res.status(400).json({
        success: false,
        message: "Name, price, dan status wajib diisi",
      });
    }

    const room = await roomsService.updateRoom(
      id,
      name,
      description,
      price,
      status,
      size
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Kamar tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Kamar berhasil diperbarui",
      data: room,
    });
  } catch (error) {
    console.error("Update room error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui kamar",
    });
  }
}

async function deleteRoom(req, res) {
  try {
    const { id } = req.params;

    const room = await roomsService.deleteRoom(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Kamar tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Kamar berhasil dihapus",
      data: room,
    });
  } catch (error) {
    console.error("Delete room error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus kamar",
    });
  }
}

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};