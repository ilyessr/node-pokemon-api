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
import cors from "cors"
import createUser from "./routes/createUser";
import resetDB from "./routes/resetDB";

const app = express();

const port = process.env.PORT || 3000;

app.use(favicon("public/favicon.ico")).use(express.json())
  .use(cors());

findAllPokemons(app);
findPokemonByPk(app);
createPokemon(app);
createUser(app);
updatePokemon(app);
deletePokemon(app);
resetDB(app)
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
