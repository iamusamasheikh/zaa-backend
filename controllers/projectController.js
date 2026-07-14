const Project = require("../models/Project");
const initialProject = require("../config/initialProject");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId }).select("-pages");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, user: req.userId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const existing = await Project.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const project = new Project({
      name,
      slug,
      user: req.userId,
      pages: [
        {
          id: "home",
          name: "Home",
          slug: "/",
          sections: [],
          seo: {},
        },
      ],
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { pages, settings } = req.body;

    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug, user: req.userId },
      { pages, settings, updatedAt: Date.now() },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findOneAndDelete({ slug: req.params.slug, user: req.userId });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.duplicateProject = async (req, res) => {
  try {
    const original = await Project.findOne({ slug: req.params.slug, user: req.userId });
    if (!original) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newProject = new Project({
      name: `${original.name} (Copy)`,
      slug: `${original.slug}-copy-${Date.now()}`,
      user: req.userId,
      pages: original.pages,
      settings: original.settings,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug, user: req.userId },
      {
        pages: initialProject.pages,
        settings: initialProject.settings,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project reset to initial website template success", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Safely upgrades projects created by the old builder, where every page except
// Home was created with an empty sections array. Existing page edits are kept.
exports.restoreMissingPageTemplates = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, user: req.userId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let restored = 0;
    project.pages.forEach((page) => {
      if (page.sections?.length) return;
      const template = initialProject.pages.find(
        (candidate) => candidate.id === page.id || candidate.slug === page.slug
      );
      if (!template?.sections?.length) return;
      page.sections = JSON.parse(JSON.stringify(template.sections));
      if (!page.seo?.title && template.seo) page.seo = JSON.parse(JSON.stringify(template.seo));
      restored += 1;
    });

    if (restored) {
      project.updatedAt = Date.now();
      await project.save();
    }

    res.json({ message: `${restored} missing page template(s) restored`, restored, project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
