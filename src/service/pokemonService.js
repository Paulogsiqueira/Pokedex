import axios from 'axios';

const URL_API = 'https://pokeapi.co/api/v2/'

export const getPokemonsName = async (id, language) => {
    const pokemonInfo = await axios.get(
        `${URL_API}pokemon-species/${id}`
    )
    let pokemonName = "";
    pokemonInfo.data.names.map((name) => {
        if (name.language.name == language.value.toLowerCase()) {
            pokemonName = name.name
        }
    })
    if (pokemonName == "") {
        pokemonInfo.data.names.map((name) => {
            if (name.language.name == 'en') {
                pokemonName = name.name
            }
        })
    }

    return pokemonName

}

export const getPokemonsByNameAndId = async (value) => {
    try {
        const response = await axios.get(`${URL_API}/pokemon/${value}`);
        const pokemonData = response.data;
        return [{ name: pokemonData.name, url: `${URL_API}pokemon/${pokemonData.id}/` }];
    } catch (error) {
        console.error('Pokemon not found', error);
        return [];
    }
};

export const getPokemonsBySpecies = async (value) => {
    try {
        const pokemons = await axios.get(`${URL_API}pokemon-species/${value}`);
        const pokemonsList = [];
        pokemons.data.varieties.map((variety) => pokemonsList.push(variety.pokemon))
        console.log(pokemonsList)
        return pokemonsList
    } catch (error) {
        console.error('Specie not found', error);
        return [];
    }

}

export const getPokemonsByType = async (value) => {
    try {
        const pokemons = await axios.get(
            `${URL_API}type/${value}`
        );
        const pokemonsList = [];
        pokemons.data.pokemon.map((pokemon) => pokemonsList.push(pokemon.pokemon))
        return pokemonsList
    } catch (error) {
        console.error('Type not found', error);
        return [];
    }

}

export const getPokemonCharacteristics = async (value) => {
    try {
        const pokemon = await axios.get(
            `${URL_API}pokemon/${value}`
        );
        return pokemon.data
    } catch (error) {
        console.error('Pokemon not found', error);
        return {};
    }

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

