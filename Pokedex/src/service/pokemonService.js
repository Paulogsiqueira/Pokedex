import axios from 'axios';

const URL_API = 'https://pokeapi.co/api/v2/'

export const getPokemonsByNameAndId = async (value) => {
    const pokemons = await axios.get(
        `${URL_API}/pokemon/${value}`
    );
    return [{ name: pokemons.data.name, url: `${URL_API}pokemon/${pokemons.data.id}/` }];
}

export const getPokemonsBySpecies = async (value) => {
    const pokemons = await axios.get(
        `${URL_API}pokemon-species/${value}`
    );
    const pokemonsList = [];
    pokemons.data.varieties.map((variety) => pokemonsList.push(variety.pokemon))
    return pokemonsList
}

export const getPokemonsByType = async (value) => {
    const pokemons = await axios.get(
        `${URL_API}type/${value}`
    );
    const pokemonsList = [];
    pokemons.data.pokemon.map((pokemon) => pokemonsList.push(pokemon.pokemon))
    return pokemonsList
}

export const getPokemonCharacteristics = async (value) => {
    const pokemon = await axios.get(
        `${URL_API}pokemon/${value}`
    );
    return pokemon.data
}

export const getPokemonEvolutions = async (value) => {
    const pokemon = await axios.get(
        `${URL_API}pokemon-species/${value}`
    );
    const evolutionId = pokemon.data.evolution_chain.url.split("/")[6];
    const evolutionChain = await axios.get(
        `${URL_API}evolution-chain/${evolutionId}`
    );
    const evolutionNames = [];
    if (evolutionChain === undefined) {
    } else {
        evolutionNames.push(evolutionChain.data.chain.species.name)
        if (evolutionChain.data.chain.evolves_to[0]) {
            evolutionNames.push(evolutionChain.data.chain.evolves_to[0].species.name);
            if (evolutionChain.data.chain.evolves_to[0].evolves_to[0]) {
                evolutionNames.push(evolutionChain.data.chain.evolves_to[0].evolves_to[0].species.name)
            }
        }

    }
    return evolutionNames
}

