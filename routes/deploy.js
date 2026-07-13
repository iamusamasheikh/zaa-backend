const express = require("express");
const router = express.Router();
const { deploy, getDeployments } = require("../controllers/deployController");
const auth = require("../middleware/auth");

router.post("/:slug", auth, deploy);
router.get("/:projectId/history", auth, getDeployments);

module.exports = router;
