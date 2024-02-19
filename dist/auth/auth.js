"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const private_key_1 = __importDefault(require("../auth/private_key"));
exports.default = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    }
    const token = authorizationHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, private_key_1.default, (error, decoded) => {
        if (error) {
            const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
            return res.status(401).json({ message, data: error });
        }
        const decodedToken = decoded;
        if (typeof decodedToken !== 'string' && decodedToken.userId) {
            if (req.body.userId && req.body.userId !== decodedToken.userId) {
                const message = `L'identifiant de l'utilisateur est invalide.`;
                return res.status(401).json({ message });
            }
            else {
                next();
            }
        }
        else {
            return res.status(401).json({ message: "Token invalide" });
        }
    });
};
