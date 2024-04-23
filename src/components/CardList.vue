<script setup>
import { onMounted, ref, computed } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { useStore } from "vuex/dist/vuex.cjs.js";
import Card from "./Card.vue";
import axios from "axios";

const minValue = ref(0);
const requestLimit = 20;
const listEl = ref(null);
const store = useStore();
const pokemonsLimit = 1025;
const pokeList = computed(() => store.getters.getPokemonsListing);
const pokemonsResearched = computed(() => store.getters.getPokemonsResearched);

const getPokemons = async (minValue) => {
  const limit =
    minValue + requestLimit < pokemonsLimit
      ? requestLimit
      : requestLimit - (minValue + requestLimit - pokemonsLimit);

  const pokemons = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${minValue}`
  );
  store.commit("ADD_POKEMONS", pokemons.data.results);
  return pokemons.data.results;
};

useInfiniteScroll(
  listEl,
  () => {
    if (minValue.value + requestLimit < pokemonsLimit) {
      minValue.value += 20;
      getPokemons(minValue.value);
    }
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
  width: 90%;
  display: flex;
  margin-left: 5%;
  min-width: 300px;
  border-radius: 5px;
  border: 2px solid #606060;
  background-color: #909090;
}

.listContent {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 100vh;
  padding: 20px 20px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 5px #555555;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #ffce4b;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff8c38;
}

@media (max-width: 1000px) {
  .listContent {
    justify-content: center;
  }
}
</style>
