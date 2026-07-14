const Project = require("../models/Project");
const Deployment = require("../models/Deployment");
const { generateProjectFiles } = require("../services/codeGenerator");
const { deployToVercel } = require("../services/vercelDeploy");

exports.deploy = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, user: req.userId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.pages?.length) {
      return res.status(400).json({ message: "Add at least one page before publishing" });
    }

    const deployment = new Deployment({
      project: project._id,
      url: `https://${project.slug}.vercel.app`,
      status: "pending",
    });
    await deployment.save();

    deployment.status = "building";
    deployment.logs.push({ message: "Generating files..." });
    await deployment.save();

    const filesPath = await generateProjectFiles(project);

    deployment.logs.push({ message: "Deploying to Vercel..." });
    await deployment.save();

    const result = await deployToVercel(filesPath, project.slug);

    if (result.success) {
      deployment.status = "success";
      deployment.url = result.url;
      deployment.logs.push({ message: `Deployed to ${result.url}` });

      project.isPublished = true;
      project.publishedUrl = result.url;
      // Keep a separate, immutable public version. Saving afterward creates a
      // draft; it cannot accidentally change the live website.
      project.publishedPages = JSON.parse(JSON.stringify(project.pages));
      project.publishedSettings = JSON.parse(JSON.stringify(project.settings || {}));
      project.publishedAt = new Date();
      await project.save();
    } else {
      deployment.status = "failed";
      deployment.logs.push({ message: result.error });
    }

    await deployment.save();
    res.json(deployment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDeployments = async (req, res) => {
  try {
    const deployments = await Deployment.find({ project: req.params.projectId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(deployments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
