<script setup>
import CardList from "./components/CardList.vue";
import { onMounted, ref, computed } from "vue";
import InputFilter from "./components/InputFilter.vue";

let pokemonsList = ref([]);
let searchValue = ref("");
let searchType = ref("Name");

const updateSearchValue = (newValue) => {
  searchValue.value = newValue;
};

const updateSearchType = (newValue) => {
  searchType.value = newValue;
};

onMounted(() => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    .then((response) => response.json())
    .then((response) => (pokemonsList.value = response.results));
});

const pokemonsFiltered = computed(() => {
  if (pokemonsList.value && searchValue.value) {
    if(searchType.value == "Name"){
      return pokemonsList.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.value.toLowerCase()))
    }else if(searchType.value == "Id"){
      return pokemonsList.value.filter((pokemon) =>
      pokemon.url.split('/')[6] == searchValue.value)
    }
  
  }
  return pokemonsList.value
});
</script>

<template>
  <div class="fullContent">
    <h1>Pokedex</h1>
    <InputFilter
      v-model="searchValue"
      @updateSearchValue="updateSearchValue"
      @updateSearchType="updateSearchType"
    />
    <CardList :pokemonsList="pokemonsFiltered" />
  </div>
</template>

<style scoped>
.fullContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
