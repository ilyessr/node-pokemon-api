import express, { Request, Response } from "express";
import { Op } from "sequelize";
import { Pokemon } from "../db/sequelize";
import auth from "../auth/auth";

const DEFAULT_LIMIT = 5;
const MIN_SEARCH_LENGTH = 2;

export default (app: express.Application) => {
  app.get("/api/pokemons", auth, (req: Request, res: Response) => {
    if (req.query.name) {
      const { name } = req.query;
      const limit =
        typeof req.query.limit === "string"
          ? parseInt(req.query.limit, DEFAULT_LIMIT)
          : DEFAULT_LIMIT;
      if (typeof name === "string" && name.length < MIN_SEARCH_LENGTH) {
        const message =
          "Le terme de recherche doit tenir au moins deux caractères";
        return res.status(400).json({ message });
      }

      return Pokemon.findAndCountAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        order: ["name"],
        limit: typeof limit === "string" ? parseInt(limit) : DEFAULT_LIMIT,
      }).then(({ rows, count }) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}.`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll()
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
