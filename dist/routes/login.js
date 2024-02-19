"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("../db/sequelize");
const private_key_1 = __importDefault(require("../auth/private_key"));
const auth_1 = __importDefault(require("../auth/auth"));
exports.default = (app) => {
    app.post("/api/login", auth_1.default, (req, res) => {
        sequelize_1.User.findOne({ where: { username: req.body.username } })
            .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "L'utilisateur n'existe pas." });
            }
            bcrypt_1.default
                .compare(req.body.password, user.password)
                .then((isPasswordValid) => {
                if (!isPasswordValid) {
                    const message = `Le mot de passe est incorrect.`;
                    return res.status(401).json({ message });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, private_key_1.default, {
                    expiresIn: "24h",
                });
                const message = `L'utilisateur a été connecté avec succès`;
                return res.json({ message, data: user, token });
            });
        })
            .catch((error) => res.status(500).json({
            message: "Un problème est survenu lors de la vérification de l’utilisateur.",
            error,
        }));
    });
};
