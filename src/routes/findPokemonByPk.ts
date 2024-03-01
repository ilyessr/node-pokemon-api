import express, { Request, Response } from "express";
import { Pokemon } from "../db/sequelize";
import auth from "../auth/auth";

export default (app: express.Application) => {
  app.get("/api/pokemons/:id", auth, (req: Request, res: Response) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (!pokemon) {
          const message = "Le pokémon correspondant à cet ID n'a pas été trouvé.";
          res.status(404).json({ message });
          return;
        }

        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message =
          "Le pokémon n'a pas pu être trouvé. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
