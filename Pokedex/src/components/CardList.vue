<script setup>
import { onMounted, ref, computed} from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { useStore } from "vuex/dist/vuex.cjs.js";
import Card from "./Card.vue";
import axios from "axios";


let minValue = ref(0);
const listEl = ref(null);
const store = useStore();
const pokeList = computed(() => store.getters.getPokemonsListing);
const pokemonsResearched = computed(() => store.getters.getPokemonsResearched);

const getPokemons = async (minValue) => {
  const pokemons = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${minValue}`
  );
  store.commit("ADD_POKEMONS", pokemons.data.results);
  return pokemons.data.results;
};

const getPokemonsOnScroll = () => {
  minValue.value += 20;
  getPokemons(minValue.value);
};

useInfiniteScroll(
  listEl,
  async () => {
    getPokemonsOnScroll();
  },
  { distance: 20 }
);

onMounted(() => {
 getPokemons(minValue.value);
});
</script>

<template>
  <div>
    <div class="cardList">
      <ul ref="listEl" class="listContent">
        <Card
          v-for="pokemon in pokemonsResearched.length > 0
            ? pokemonsResearched
            : pokeList"
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
  border: 2px solid rgb(96, 96, 96);
  border-radius: 5px;
  background-color: rgb(144, 144, 144);
}

.listContent {
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px;
}
</style>
