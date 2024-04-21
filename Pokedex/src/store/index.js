import { createStore } from 'vuex'
import { getPokemonsByNameAndId, getPokemonsBySpecies, getPokemonsByType} from '../methods/methods'

const store = createStore({
    state: {
        language: 'EN',
        pokeList: [],
        pokemonsResearched: [],
        searchValue: '',
        searchOption: 'Name'

    },
    getters: {
        getPokemonsListing(state) {
            return state.pokeList
        },
        getSearchOption(state) {
            return state.searchOption
        },
        getPokemonsResearched(state) {
            return state.pokemonsResearched
        },
        getSearchValue(state) {
            return state.searchValue
        },
        getLanguage(state) {
            return state.language
        }
    },
    mutations: {
        ADD_POKEMONS(state, payload) {
            state.pokeList = [...state.pokeList, ...payload];
        },
        EDIT_SEARCH_OPTION(state, payload) {
            state.searchOption = payload;
        },
        EDIT_SEARCH_VALUE(state, payload) {
            state.searchValue = payload;
        },
        ADD_FILTER_OPTIONS(state) {
            if (state.searchValue != "") {
                if (state.searchOption == "Name") {
                    getPokemonsByNameAndId(state.searchValue).then((result) => {
                        state.pokemonsResearched = result;
                    })
                } else if (state.searchOption == "Id") {
                    getPokemonsByNameAndId(state.searchValue).then((result) => {
                        state.pokemonsResearched = result;
                    })
                }else if( state.searchOption == "Species"){
                    getPokemonsBySpecies(state.searchValue).then((result) => {
                        state.pokemonsResearched = result;
                    })
                }else if( state.searchOption == "Type"){
                    getPokemonsByType(state.searchValue).then((result) => {
                        state.pokemonsResearched = result;
                    })
                }
            } else {
                state.pokemonsResearched = []
            }
        },
        EDIT_LANGUAGE(state,payload){
            state.language = payload
        }
    },
    actions: {}
})

export default store