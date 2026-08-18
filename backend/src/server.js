const express = require("express");
const cors = require("cors");

const kostRoutes = require("./routes/kost.routes");
const roomsRoutes = require("./routes/rooms.routes");
const facilitiesRoutes = require("./routes/facilities.routes");
const galleryRoutes = require("./routes/gallery.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "KostKu API is running",
  });
});

app.use("/api/kost", kostRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/facilities", facilitiesRoutes);
app.use("/api/gallery", galleryRoutes);

app.listen(PORT, () => {
  console.log(`KostKu API running on http://localhost:${PORT}`);
});