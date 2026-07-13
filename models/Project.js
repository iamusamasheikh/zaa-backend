const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  id: String,
  type: { type: String, required: true },
  props: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const pageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  sections: [sectionSchema],
  seo: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
    ogImage: { type: String, default: "" },
  },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pages: [pageSchema],
  settings: {
    siteName: { type: String, default: "ZAA Med Solutions" },
    phone: { type: String, default: "+92 321 558 8718" },
    email: { type: String, default: "info@zaamedsolutions.com" },
    address: { type: String, default: "New York, NY 11377" },
    ga4Id: { type: String, default: "" },
    gscCode: { type: String, default: "" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    primaryColor: { type: String, default: "#1ABC9C" },
    darkColor: { type: String, default: "#1A1A2E" },
  },
  deployments: [
    {
      url: String,
      status: {
        type: String,
        enum: ["pending", "building", "success", "failed"],
        default: "pending",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  isPublished: { type: Boolean, default: false },
  publishedUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
