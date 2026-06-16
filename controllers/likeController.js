const db = require("../config/db");

exports.toggleLike = (req, res) => {

    const userId = req.user.id;
    const projectId = req.params.projectId;

    const checkSql =
        "SELECT * FROM likes WHERE user_id = ? AND project_id = ?";

    db.query(checkSql, [userId, projectId], (err, result) => {

        if (err) {
            return res.status(500).json({ erreur: err.message });
        }

        if (result.length > 0) {

            db.query(
                "DELETE FROM likes WHERE user_id=? AND project_id=?",
                [userId, projectId],
                (err) => {

                    if (err) {
                        return res.status(500).json({ erreur: err.message });
                    }

                    return res.json({
                        message: "Like retiré"
                    });

                }
            );

        } else {

            db.query(
                "INSERT INTO likes(user_id, project_id) VALUES(?,?)",
                [userId, projectId],
                (err) => {

                    if (err) {
                        return res.status(500).json({ erreur: err.message });
                    }

                    return res.json({
                        message: "Projet liké"
                    });

                }
            );

        }

    });

};
exports.getLikesCount = (req, res) => {

    const sql =
        "SELECT COUNT(*) AS total FROM likes WHERE project_id=?";

    db.query(sql, [req.params.projectId], (err, result) => {

        if (err) {
            return res.status(500).json({ erreur: err.message });
        }

        res.json(result[0]);

    });

};