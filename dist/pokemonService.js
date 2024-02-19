"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokemonService = void 0;
const mock_pokemon_1 = __importDefault(require("./db/mock-pokemon"));
class PokemonService {
    constructor() {
        this.pokemons = [...mock_pokemon_1.default];
    }
    getAll() {
        return this.pokemons;
    }
    findById(id) {
        return this.pokemons.find((pokemon) => pokemon.id === id);
    }
    updateById(id, updateData) {
        const index = this.pokemons.findIndex((pokemon) => pokemon.id === id);
        if (index !== -1) {
            this.pokemons[index] = Object.assign(Object.assign({}, this.pokemons[index]), updateData);
            return this.pokemons[index];
        }
        return null;
    }
    deleteById(id) {
        const index = this.pokemons.findIndex((pokemon) => pokemon.id === id);
        if (index !== -1) {
            return this.pokemons.splice(index, 1)[0];
        }
        return null;
    }
}
exports.pokemonService = new PokemonService();
