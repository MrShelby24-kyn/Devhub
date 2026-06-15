const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

router.post("/", authMiddleware, createProject);

router.get("/", getProjects);

router.get("/:id", getProject);

router.put("/:id", authMiddleware, updateProject);

router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;