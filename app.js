
const express = require("express");

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");

app.use("/api/likes", likeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use("/uploads", express.static("uploads"));

require("./config/db");


const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Bienvenue sur DevHub 🚀");
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});