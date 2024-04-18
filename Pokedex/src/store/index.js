import { createStore} from 'vuex'

const store = createStore({
    state:{
        pokeList:[],
        pokemonsResearched:[],
        searchValue:'',
        searchOption:'Name'

    },
    getters:{
        getPokemonsListing(state){
            return state.pokeList
        },
        getSearchOption(state){
            return state.searchOption
        },
        getPokemonsResearched(state){
            return state.pokemonsResearched
        }
        

    },
    mutations:{
        ADD_POKEMONS(state,payload){
            state.pokeList = [...state.pokeList, ...payload];
        },
        EDIT_OPTION(state,payload){
            state.searchOption = payload;
        },
        ADD_FILTER_OPTIONS(state,payload){
            if(payload == ""){
                state.pokemonsResearched = []
            }else{
                state.pokemonsResearched = state.pokeList.filter((pokemon) => pokemon.name == payload)
            }
        }
    },
    actions:{}  
})

export default store