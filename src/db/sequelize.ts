import { Sequelize } from "sequelize-typescript";
import Pokemon from "../models/pokemon";
import pokemons from "./mock-pokemon";
import User from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';


dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3000;
const dbPassword = process.env.DB_PASSWORD;

if (!dbName || !dbUsername || !dbHost || !dbPort) {
  throw new Error(
    `Missing required environment variables for database configuration: DB_NAME, DB_USERNAME, DB_HOST, DB_PORT`
  );
}

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: process.env.NODE_ENV === "production" ? true : false,
});

sequelize.addModels([Pokemon, User]);

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });

    const pokemonPromises = pokemons.map((pokemon) =>
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      })
    );

    await Promise.all(pokemonPromises);

    // const createdPokemons = await Promise.all(pokemonPromises);
    // createdPokemons.forEach((pokemon) => console.log(pokemon.toJSON()));

    bcrypt
      .hash("pikachu", 10)
      .then((hash) => User.create({ username: "pikachu", password: hash }))
      .then((user) => console.log(user.toJSON()));

    console.log("La base de donnée a bien été initialisée !");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      error
    );
  }
};

export { initDb, Pokemon, User };
