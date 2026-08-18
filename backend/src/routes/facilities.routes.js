const express = require("express");
const facilitiesController = require("../controllers/facilities.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", facilitiesController.getFacilities);

router.post(
  "/",
  authenticateToken,
  facilitiesController.createFacility
);

router.put(
  "/:id",
  authenticateToken,
  facilitiesController.updateFacility
);

router.delete(
  "/:id",
  authenticateToken,
  facilitiesController.deleteFacility
);

module.exports = router;