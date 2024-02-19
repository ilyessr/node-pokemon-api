"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const sequelize_1 = require("./db/sequelize");
const pg_1 = require("pg");
const createPokemon_1 = __importDefault(require("./routes/createPokemon"));
const deletePokemon_1 = __importDefault(require("./routes/deletePokemon"));
const updatePokemon_1 = __importDefault(require("./routes/updatePokemon"));
const findAllPokemons_1 = __importDefault(require("./routes/findAllPokemons"));
const findPokemonByPk_1 = __importDefault(require("./routes/findPokemonByPk"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, serve_favicon_1.default)("public/favicon.ico")).use(express_1.default.json());
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
(0, findAllPokemons_1.default)(app);
(0, findPokemonByPk_1.default)(app);
(0, createPokemon_1.default)(app);
(0, updatePokemon_1.default)(app);
(0, deletePokemon_1.default)(app);
(0, login_1.default)(app);
app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
    res.status(404).json({ message });
});
(0, sequelize_1.initDb)();
app.listen(port, () => console.log(`Serveur lancé sur http://localhost:${port}`));
