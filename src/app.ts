import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import favicon from "serve-favicon";
import { initDb } from "./db/sequelize";
import { Pool } from 'pg';
import createPokemon from "./routes/createPokemon";
import deletePokemon from "./routes/deletePokemon";
import updatePokemon from "./routes/updatePokemon";
import findAllPokemons from "./routes/findAllPokemons";
import findPokemonByPk from "./routes/findPokemonByPk";
import login from "./routes/login";

const app = express();

const port = process.env.PORT || 3000;

app.use(favicon("public/favicon.ico")).use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

findAllPokemons(app);
findPokemonByPk(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);
login(app)

app.use(({ res }: { res: Response }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

initDb();

app.listen(port, () =>
  console.log(`Serveur lancé sur http://localhost:${port}`)
);
