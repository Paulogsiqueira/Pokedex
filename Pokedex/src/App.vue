<script setup>
import CardList from "./components/CardList.vue";
import { ref, computed, reactive } from "vue";
import InputFilter from "./components/InputFilter.vue";


const listEl = ref(null);
let searchValue = ref("");
let searchType = ref("Name");

const data = reactive({
  usersList: [],
});

const updateSearchValue = (newValue) => {
  searchValue.value = newValue;
};

const updateSearchType = (newValue) => {
  searchType.value = newValue;
};

const pokemonsFiltered = computed(() => {
  if (data.usersList && searchValue.value) {
    if (searchType.value == "Name") {
      return data.usersList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    } else if (searchType.value == "Id") {
      return data.usersList.filter(
        (pokemon) => pokemon.url.split("/")[6] == searchValue.value
      );
    }
  }
  return data.usersList;
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
    <CardList :usersList="pokemonsFiltered" />
  </div>
</template>

<style scoped>
.fullContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100vh;
}

</style>
