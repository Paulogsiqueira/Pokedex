<script setup>
import Card from "./Card.vue";
import { onMounted, ref, computed, reactive } from "vue";
import axios from "axios";
import { useInfiniteScroll } from "@vueuse/core";
import { useStore } from "vuex"; 

let minValue = ref(0);
let maxValue = ref(0);
const listEl = ref(null);
const store = useStore();
const pokeList = computed(() => store.state.pokeList)
setTimeout(() => {
  console.log(pokeList.value)
}, 2000);

setTimeout(() => {
  console.log(pokeList.value)
}, 5000);

const data = reactive({
  pokemonsList: [],
});

const getPokemons = async (minValue,maxValue) => {
  const users = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${maxValue}&offset=${minValue}`
  );
  return users.data.results;
};

const getPokemonsOnScroll = async () => {
  minValue.value = maxValue.value +1 ;
  maxValue.value += 10;
  const newPokemons = await getPokemons(minValue.value,maxValue.value );
  data.pokemonsList.push(...newPokemons);
  const newPokemonsName = newPokemons.map((pokemon) => pokemon.name)
  store.commit('ADD_POKEMONS', newPokemonsName )
};

useInfiniteScroll(listEl, async () => {
  await getPokemonsOnScroll();
},{
  distance: 20
});

onMounted(async () => {
  const newPokemons = await getPokemons(minValue.value,maxValue.value);
  data.pokemonsList.push(...newPokemons);
});


</script>

<template>
  <div >
    <div class="cardList">
      <ul ref="listEl" class="listContent">
        <Card
          v-for="pokemon in data.pokemonsList"
          :key="pokemon.name"
          :pokemon="pokemon"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cardList {
  display: flex;
  width: 90%;
  margin-left: 5%;
}

.listContent{
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  border:1px solid red
}

</style>
