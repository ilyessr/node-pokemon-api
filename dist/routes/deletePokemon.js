"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../db/sequelize");
const auth_1 = __importDefault(require("../auth/auth"));
exports.default = (app) => {
    app.delete("/api/pokemons/:id", auth_1.default, (req, res) => {
        const id = req.params.id;
        sequelize_1.Pokemon.findByPk(id)
            .then((pokemon) => {
            if (!pokemon) {
                res.status(404).json({
                    message: `Aucun pokémon trouvé avec l'identifiant n°${id}.`,
                });
                return;
            }
            return sequelize_1.Pokemon.destroy({ where: { id } }).then(() => {
                const message = `Le pokémon avec l'identifiant n°${id} a bien été supprimé.`;
                res.json({ message, data: pokemon });
            });
        })
            .catch((error) => {
            res.status(500).json({
                message: "Une erreur s'est produite lors de la suppression du pokémon.",
                data: error,
            });
        });
    });
};
