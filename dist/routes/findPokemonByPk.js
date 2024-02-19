"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../db/sequelize");
const auth_1 = __importDefault(require("../auth/auth"));
exports.default = (app) => {
    app.get("/api/pokemons/:id", auth_1.default, (req, res) => {
        sequelize_1.Pokemon.findByPk(req.params.id)
            .then((pokemon) => {
            const message = "Un pokémon a bien été trouvé.";
            res.json({ message, data: pokemon });
        })
            .catch((error) => {
            const message = "Le pokémon n'a pas pu être trouvé. Réessayez dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
    });
};
