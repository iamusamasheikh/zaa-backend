const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Public API to get page sections
router.get("/page", async (req, res) => {
  try {
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ success: false, message: "Slug parameter is required" });
    }

    // Normalize slug (e.g. "home" or "" -> "/", "about" -> "/about")
    let targetSlug = slug.trim();
    if (targetSlug === "home" || targetSlug === "") {
      targetSlug = "/";
    }
    if (targetSlug !== "/" && !targetSlug.startsWith("/")) {
      targetSlug = "/" + targetSlug;
    }

    // Find the primary project
    let project = await Project.findOne({ slug: "zaa-med-solutions" });
    if (!project) {
      // Fallback to first project
      project = await Project.findOne();
    }

    if (!project) {
      return res.status(404).json({ success: false, message: "No projects found" });
    }

    // Find the requested page
    const page = project.pages.find(
      (p) => p.slug === targetSlug || p.id === slug || p.name.toLowerCase() === slug.toLowerCase()
    );

    if (!page) {
      return res.status(404).json({ success: false, message: `Page with slug '${slug}' not found` });
    }

    res.json({
      success: true,
      page: {
        id: page.id,
        name: page.name,
        slug: page.slug,
        sections: page.sections,
        seo: page.seo,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public API to get site settings
router.get("/settings", async (req, res) => {
  try {
    let project = await Project.findOne({ slug: "zaa-med-solutions" });
    if (!project) {
      project = await Project.findOne();
    }

    if (!project) {
      return res.status(404).json({ success: false, message: "No projects found" });
    }

    res.json({
      success: true,
      settings: project.settings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
