import express, { Request, Response } from "express";
import { Pokemon } from "../db/sequelize";
import { UniqueConstraintError, ValidationError } from "sequelize";
import auth from "../auth/auth";

export default (app: express.Application) => {
  app.put("/api/pokemons/:id", auth, (req: Request, res: Response) => {
    const id = req.params.id;
    Pokemon.update(req.body, { where: { id } })
      .then(() => Pokemon.findByPk(id))
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "Le Pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
          return res.status(400).json({ message });
        }

        const message = `Le Pokémon ${pokemon.name} a bien été modifié.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }

        const message =
          "Le Pokémon n'a pas pu être modifié. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
