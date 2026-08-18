const express = require("express");
const roomsController = require("../controllers/rooms.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", roomsController.getRooms);

router.post(
  "/",
  authenticateToken,
  roomsController.createRoom
);

router.put(
  "/:id",
  authenticateToken,
  roomsController.updateRoom
);

router.delete(
  "/:id",
  authenticateToken,
  roomsController.deleteRoom
);

module.exports = router;