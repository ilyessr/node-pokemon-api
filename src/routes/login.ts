import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize";

export default (app: express.Application) => {

  const privateKey = process.env.PRIVATE_KEY || "";

  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(404).json({ message: "L'utilisateur n'existe pas." });
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Le mot de passe est incorrect." });
      }

      const token = jwt.sign({ userId: user.id }, privateKey || "", {
        expiresIn: "24h",
      });

      const { password, ...userData } = user.toJSON();

      return res.json({
        message: "L'utilisateur a été connecté avec succès",
        data: { ...userData, token },

      });



    } catch (error) {
      return res.status(500).json({
        message: "Un problème est survenu lors de la vérification de l’utilisateur.",
        error,
      });
    }
  });
};

