import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/sequelize";
import CUSTOM_PRIVATE_KEY from "../auth/private_key";
import auth from "../auth/auth";

export default (app: express.Application) => {
  app.post("/api/login", auth, (req: Request, res: Response) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: "L'utilisateur n'existe pas." });
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe est incorrect.`;
              return res.status(401).json({ message });
            }

            const token = jwt.sign({ userId: user.id }, CUSTOM_PRIVATE_KEY, {
              expiresIn: "24h",
            });

            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          });
      })
      .catch((error) =>
        res.status(500).json({
          message:
            "Un problème est survenu lors de la vérification de l’utilisateur.",
          error,
        })
      );
  });
};
