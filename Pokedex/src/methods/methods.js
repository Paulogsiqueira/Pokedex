import axios from 'axios';

export const getPokemonsByNameAndId = async (value) => {
    const pokemons = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${value}`
    );
    return [{ name: pokemons.data.name, url: `https://pokeapi.co/api/v2/pokemon/${pokemons.data.order}/` }];
}

export const getPokemonsBySpecies = async (value) => {
    const pokemons = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    const pokemonsList =[];
    pokemons.data.varieties.map((variety) =>pokemonsList.push(variety.pokemon))
    return pokemonsList
}

export const getPokemonsByType = async (value) => {
    const pokemons = await axios.get(
        `https://pokeapi.co/api/v2/type/${value}`
    );
    const pokemonsList =[];
    pokemons.data.pokemon.map((pokemon) => pokemonsList.push(pokemon.pokemon))
    return pokemonsList
}
