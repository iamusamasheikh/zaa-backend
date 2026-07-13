const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  duplicateProject,
} = require("../controllers/projectController");
const auth = require("../middleware/auth");

router.get("/", auth, getProjects);
router.get("/:slug", auth, getProject);
router.post("/", auth, createProject);
router.put("/:slug", auth, updateProject);
router.delete("/:slug", auth, deleteProject);
router.post("/:slug/duplicate", auth, duplicateProject);

module.exports = router;
