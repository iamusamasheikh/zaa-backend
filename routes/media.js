const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.post("/upload", auth, upload.single("file"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
