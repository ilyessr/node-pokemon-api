"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const auth_1 = __importDefault(require("../auth/auth"));
const sequelize_2 = require("../db/sequelize");
exports.default = (app) => {
    app.post("/api/pokemons", auth_1.default, (req, res) => {
        sequelize_2.Pokemon.create(req.body)
            .then((pokemon) => {
            const message = `Le pokémon ${req.body.name} a bien été crée.`;
            res.json({ message, data: pokemon });
        })
            .catch((error) => {
            if (error instanceof sequelize_1.ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            if (error instanceof sequelize_1.UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = `Le pokémon n'a pas pu être ajouté. Réessayez dans quelques instants.`;
            res.status(500).json({ message, data: error });
        });
    });
};
