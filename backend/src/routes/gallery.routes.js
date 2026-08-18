const express = require("express");
const galleryController = require("../controllers/gallery.controller");

const router = express.Router();

router.get("/", galleryController.getGallery);

module.exports = router;