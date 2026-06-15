const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.register = async (req, res) => {
  const { nom, prenom, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [nom, prenom, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ erreur: err.message });
        }

        res.status(201).json({
          message: "Utilisateur créé avec succès",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      erreur: error.message,
    });
  }
};