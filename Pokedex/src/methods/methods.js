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
    const pokemonsList = [];
    pokemons.data.varieties.map((variety) => pokemonsList.push(variety.pokemon))
    return pokemonsList
}

export const getPokemonsByType = async (value) => {
    const pokemons = await axios.get(
        `https://pokeapi.co/api/v2/type/${value}`
    );
    const pokemonsList = [];
    pokemons.data.pokemon.map((pokemon) => pokemonsList.push(pokemon.pokemon))
    return pokemonsList
}

export const getPokemonCharacteristics = async (value) => {
    const pokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${value}`
    );
    return pokemon.data
}

export const getPokemonEvolutions = async (value) => {
    const pokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    const evolutionId = pokemon.data.evolution_chain.url.split("/")[6];
    const evolutionChain = await axios.get(
        `https://pokeapi.co/api/v2/evolution-chain/${evolutionId}`
    );
    const evolutionNames =[];
    if (evolutionChain === undefined) {
    }else{
        const firstEvolution = evolutionChain.data.chain.evolves_to[0]
        evolutionNames.push(evolutionChain.data.chain.species.name);
        evolutionNames.push(firstEvolution.species.name)
        if(evolutionChain.data.chain.evolves_to[0].evolves_to[0]){
            evolutionNames.push(evolutionChain.data.chain.evolves_to[0].evolves_to[0].species.name)
        }
    }
    return evolutionNames
}

