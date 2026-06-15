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
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ erreur: err.message });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect"
      });
    }

    const user = result[0];

    const passwordValide = await bcrypt.compare(password, user.password);

    if (!passwordValide) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h"
      }
    );

    res.json({
      message: "Connexion réussie",
      token
    });
  });
};
exports.profile = (req, res) => {
    res.json({
        message: "Bienvenue sur ton profil",
        utilisateur: req.user
    });
}
exports.profile = (req, res) => {

    const sql = "SELECT id, nom, prenom, email, bio, ville, pays, photo FROM users WHERE id = ?";

    db.query(sql, [req.user.id], (err, result) => {

        if (err) {
            return res.status(500).json({
                erreur: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        res.json(result[0]);

    });

};
exports.updateProfile = (req, res) => {

    const { nom, prenom, bio, ville, pays } = req.body;

    const sql = `
    UPDATE users
    SET nom = ?, prenom = ?, bio = ?, ville = ?, pays = ?
    WHERE id = ?`;

    db.query(
        sql,
        [nom, prenom, bio, ville, pays, req.user.id],
        (err) => {

            if (err) {
                return res.status(500).json({
                    erreur: err.message
                });
            }

            res.json({
                message: "Profil mis à jour avec succès"
            });

        }
    );

};