import { createStore} from 'vuex'

const store = createStore({
    state:{
        pokeList:['pikachu','charmander']
    },
    getters:{},
    mutations:{
        ADD_POKEMONS(state,payload){
            console.log(payload)
            state.pokeList.value = [...state.pokeList, payload]
        }
    },
    actions:{}  
})

export default store