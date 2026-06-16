const db = require("../config/db");

exports.createProject = (req, res) => {

    const {
        titre,
        description,
        technologie,
        categorie
    } = req.body;

    const sql = `
    INSERT INTO projects
    (titre, description, technologie, categorie, user_id)
    VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            titre,
            description,
            technologie,
            categorie,
            req.user.id
        ],
        (err) => {

            if (err) {

                return res.status(500).json({
                    erreur: err.message
                });

            }

            res.status(201).json({
                message: "Projet créé avec succès"
            });

        }
    );

};
exports.getProjects = (req, res) => {

    const {
        search,
        categorie,
        technologie,
        page = 1
    } = req.query;

    const limit = 10;
    const offset = (page - 1) * limit;

    let sql = `
        SELECT
            projects.*,
            users.nom,
            users.prenom
        FROM projects
        JOIN users
            ON users.id = projects.user_id
        WHERE 1=1
    `;

    const values = [];

    if (search) {
        sql += " AND titre LIKE ?";
        values.push(`%${search}%`);
    }

    if (categorie) {
        sql += " AND categorie = ?";
        values.push(categorie);
    }

    if (technologie) {
        sql += " AND technologie = ?";
        values.push(technologie);
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";

    values.push(limit);
    values.push(offset);

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                erreur: err.message
            });
        }

        res.json(result);

    });

};
exports.getProject = (req, res) => {

    const sql = `
    SELECT *
    FROM projects
    WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            return res.status(500).json({
                erreur: err.message
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Projet introuvable"
            });

        }

        res.json(result[0]);

    });

};
exports.updateProject = (req, res) => {

    const { titre, description, technologie, categorie } = req.body;

    const sql = `
    UPDATE projects
    SET titre=?, description=?, technologie=?, categorie=?
    WHERE id=? AND user_id=?
    `;

    db.query(
        sql,
        [
            titre,
            description,
            technologie,
            categorie,
            req.params.id,
            req.user.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    erreur: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(403).json({
                    message: "Vous ne pouvez pas modifier ce projet."
                });
            }

            res.json({
                message: "Projet modifié avec succès"
            });

        }
    );

};
exports.deleteProject = (req, res) => {

    const sql = `
    DELETE FROM projects
    WHERE id=? AND user_id=?
    `;

    db.query(
        sql,
        [req.params.id, req.user.id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    erreur: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(403).json({
                    message: "Vous ne pouvez pas supprimer ce projet."
                });
            }

            res.json({
                message: "Projet supprimé avec succès"
            });

        }
    );

};