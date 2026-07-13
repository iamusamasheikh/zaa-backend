const Media = require("../models/Media");
const fs = require("fs");
const path = require("path");

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const url = `/uploads/${req.file.filename}`;

    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url,
      uploadedBy: req.user._id,
      project: req.body.projectId || undefined,
    });

    res.status(201).json(media);
  } catch (error) {
    next(error);
  }
};

exports.getMedia = async (req, res, next) => {
  try {
    const query = { uploadedBy: req.user._id };
    if (req.query.projectId) {
      query.project = req.query.projectId;
    }

    const media = await Media.find(query).sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    next(error);
  }
};

exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id,
    });

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    const filePath = path.join(__dirname, "../uploads", media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await media.deleteOne();

    res.json({ message: "Media deleted" });
  } catch (error) {
    next(error);
  }
};
