import express, { Request, Response } from "express";
import { ValidationError, UniqueConstraintError } from "sequelize";
import auth from "../auth/auth";
import { Pokemon } from "../db/sequelize";

export default (app: express.Application) => {
  app.post("/api/pokemons", auth, (req: Request, res: Response) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le pokémon n'a pas pu être ajouté. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
