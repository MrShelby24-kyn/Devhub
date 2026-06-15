
const express = require("express");

const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

require("./config/db");


const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Bienvenue sur DevHub 🚀");
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});