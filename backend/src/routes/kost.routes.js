const express = require("express");
const kostController = require("../controllers/kost.controller");

const router = express.Router();

router.get("/", kostController.getKost);

module.exports = router;