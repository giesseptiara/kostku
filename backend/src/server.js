const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "KostKu API is running",
  });
});

app.listen(PORT, () => {
  console.log(`KostKu API running on http://localhost:${PORT}`);
});