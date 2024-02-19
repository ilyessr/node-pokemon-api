"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../db/sequelize");
const sequelize_2 = require("sequelize");
const auth_1 = __importDefault(require("../auth/auth"));
exports.default = (app) => {
    app.put("/api/pokemons/:id", auth_1.default, (req, res) => {
        const id = req.params.id;
        sequelize_1.Pokemon.update(req.body, { where: { id } })
            .then(() => sequelize_1.Pokemon.findByPk(id))
            .then((pokemon) => {
            if (pokemon === null) {
                const message = "Le Pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
                return res.status(400).json({ message });
            }
            const message = `Le Pokémon ${pokemon.name} a bien été modifié.`;
            res.json({ message, data: pokemon });
        })
            .catch((error) => {
            if (error instanceof sequelize_2.ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            if (error instanceof sequelize_2.UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Le Pokémon n'a pas pu être modifié. Réessayez dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
    });
};
