const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createProject,
    getProjects,
    getProject
} = require("../controllers/projectController");

router.post("/", authMiddleware, createProject);

router.get("/", getProjects);

router.get("/:id", getProject);

module.exports = router;