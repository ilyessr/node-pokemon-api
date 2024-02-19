"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Pokemon = exports.initDb = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const pokemon_1 = __importDefault(require("../models/pokemon"));
exports.Pokemon = pokemon_1.default;
const mock_pokemon_1 = __importDefault(require("./mock-pokemon"));
const user_1 = __importDefault(require("../models/user"));
exports.User = user_1.default;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}`
});
const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3000;
const dbPassword = process.env.DB_PASSWORD;
if (!dbName || !dbUsername || !dbHost || !dbPort) {
    throw new Error(`Missing required environment variables for database configuration: DB_NAME, DB_USERNAME, DB_HOST, DB_PORT`);
}
const sequelize = new sequelize_typescript_1.Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
    dialectOptions: {
        timezone: "Etc/GMT-2",
    },
    logging: process.env.NODE_ENV === "production" ? true : false,
});
sequelize.addModels([pokemon_1.default, user_1.default]);
const initDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.sync({ force: true });
        const pokemonPromises = mock_pokemon_1.default.map((pokemon) => pokemon_1.default.create({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types,
        }));
        yield Promise.all(pokemonPromises);
        // const createdPokemons = await Promise.all(pokemonPromises);
        // createdPokemons.forEach((pokemon) => console.log(pokemon.toJSON()));
        bcrypt_1.default
            .hash("pikachu", 10)
            .then((hash) => user_1.default.create({ username: "pikachu", password: hash }))
            .then((user) => console.log(user.toJSON()));
        console.log("La base de donnée a bien été initialisée !");
    }
    catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données :", error);
    }
});
exports.initDb = initDb;
