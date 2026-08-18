const express = require("express");
const facilitiesController = require("../controllers/facilities.controller");

const router = express.Router();

router.get("/", facilitiesController.getFacilities);

module.exports = router;