import initialPokemons, { Pokemon } from "./db/mock-pokemon";

class PokemonService {
  private pokemons = [...initialPokemons];

  getAll() {
    return this.pokemons;
  }

  findById(id: number) {
    return this.pokemons.find((pokemon) => pokemon.id === id);
  }

  updateById(id: number, updateData: Partial<Pokemon>): Pokemon | null {
    const index = this.pokemons.findIndex((pokemon) => pokemon.id === id);
    if (index !== -1) {
      this.pokemons[index] = { ...this.pokemons[index], ...updateData };
      return this.pokemons[index];
    }
    return null;
  }

  deleteById(id: number) {
    const index = this.pokemons.findIndex((pokemon) => pokemon.id === id);
    if (index !== -1) {
      return this.pokemons.splice(index, 1)[0];
    }
    return null;
  }
}

export const pokemonService = new PokemonService();
