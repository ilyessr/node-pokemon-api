// Création d'un utilisateur avec Express.js, Sequelize et bcrypt

import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize";

export default (app: express.Application) => {
    const privateKey = process.env.PRIVATE_KEY || "";

    app.post("/api/users", async (req: Request, res: Response) => {
        try {
            const existingUser = await User.findOne({ where: { username: req.body.username } });
            if (existingUser) {
                return res.status(400).json({ message: "Cet utilisateur existe déjà." });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = await User.create({
                username: req.body.username,
                password: hashedPassword,
            });

            const token = jwt.sign({ userId: newUser.id }, privateKey, {
                expiresIn: "24h",
            });

            return res.status(201).json({ message: "Utilisateur créé avec succès", data: newUser, token });
        } catch (error) {
            return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur.", error });
        }
    });
};
