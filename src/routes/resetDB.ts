import express from "express";
import { initDb } from "../db/sequelize";

export default (app: express.Application) => {
    app.post("/api/reset-db", async (req, res) => {
        try {
            await initDb();
            res.status(200).json({ message: "La base de données a été réinitialisée et repeuplée avec succès.", data: null });
        } catch (error) {
            const message =
                "Erreur lors de la réinitialisation de la base de données.";
            res.status(500).json({ message, data: error });
        }
    });
};
