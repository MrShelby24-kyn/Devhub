const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    toggleLike,
    getLikesCount
} = require("../controllers/likeController");

router.post("/:projectId", authMiddleware, toggleLike);

router.get("/:projectId", getLikesCount);

module.exports = router;