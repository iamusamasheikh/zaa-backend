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

    // Use an explicit project in production; keeping a default makes the
    // existing ZAA installation work without a breaking migration.
    const projectSlug = process.env.PUBLIC_PROJECT_SLUG || "zaa-med-solutions";
    let project = await Project.findOne({ slug: projectSlug });
    if (!project) {
      // Fallback to first project
      project = await Project.findOne();
    }

    if (!project) {
      return res.status(404).json({ success: false, message: "No projects found" });
    }

    if (!project.isPublished) {
      return res.status(404).json({ success: false, message: "Website has not been published yet" });
    }

    // Legacy projects published before snapshots existed continue to render
    // until their first new Publish. Every subsequent publish uses the
    // snapshot, so drafts are never leaked to the public website.
    const publicPages = project.publishedPages?.length ? project.publishedPages : project.pages;

    // Find the requested page
    const page = publicPages.find(
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
    const projectSlug = process.env.PUBLIC_PROJECT_SLUG || "zaa-med-solutions";
    let project = await Project.findOne({ slug: projectSlug });
    if (!project) {
      project = await Project.findOne();
    }

    if (!project) {
      return res.status(404).json({ success: false, message: "No projects found" });
    }
    if (!project.isPublished) {
      return res.status(404).json({ success: false, message: "Website has not been published yet" });
    }

    res.json({
      success: true,
      settings: project.publishedSettings || project.settings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
