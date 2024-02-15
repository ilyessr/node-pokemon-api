import express, { Request, Response } from "express";
import { Pokemon } from "../db/sequelize";
import auth from "../auth/auth";

export default (app: express.Application): void => {
  app.delete("/api/pokemons/:id", auth, (req: Request, res: Response): void => {
    const id = req.params.id;
    Pokemon.findByPk(id)
      .then((pokemon) => {
        if (!pokemon) {
          res.status(404).json({
            message: `Aucun pokémon trouvé avec l'identifiant n°${id}.`,
          });
          return;
        }
        return Pokemon.destroy({ where: { id } }).then(() => {
          const message = `Le pokémon avec l'identifiant n°${id} a bien été supprimé.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Une erreur s'est produite lors de la suppression du pokémon.",
          data: error,
        });
      });
  });
};
