const express = require("express");
const galleryController = require("../controllers/gallery.controller");
const authenticateToken = require("../middleware/auth.middleware");
const upload = require("../config/upload");

const router = express.Router();

router.get("/", galleryController.getGallery);

router.post(
  "/upload",
  authenticateToken,
  upload.single("image"),
  galleryController.uploadGalleryImage
);

router.post(
  "/",
  authenticateToken,
  galleryController.createGallery
);

router.put(
  "/:id",
  authenticateToken,
  galleryController.updateGallery
);

router.delete(
  "/:id",
  authenticateToken,
  galleryController.deleteGallery
);

module.exports = router;