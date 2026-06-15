const db = require("../config/db");

exports.createComment = (req, res) => {

    const { contenu } = req.body;

    const sql = `
        INSERT INTO comments (contenu, user_id, project_id)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            contenu,
            req.user.id,
            req.params.projectId
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    erreur: err.message
                });
            }

            res.status(201).json({
                message: "Commentaire ajouté"
            });

        }
    );

};
exports.getComments = (req, res) => {

    const sql = `
        SELECT
            comments.*,
            users.nom,
            users.prenom
        FROM comments
        JOIN users
            ON users.id = comments.user_id
        WHERE project_id = ?
        ORDER BY created_at DESC
    `;

    db.query(
        sql,
        [req.params.projectId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    erreur: err.message
                });
            }

            res.json(result);

        }
    );

};