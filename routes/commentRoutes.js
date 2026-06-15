const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    createComment,
    getComments
} = require("../controllers/commentController");

router.post("/:projectId", authMiddleware, createComment);

router.get("/:projectId", getComments);

module.exports = router;