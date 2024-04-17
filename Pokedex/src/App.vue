<script setup>
import CardList from "./components/CardList.vue";
import { onMounted, ref, computed, reactive } from "vue";
import InputFilter from "./components/InputFilter.vue";
import axios from "axios";
import { useInfiniteScroll } from "@vueuse/core";

let minValue = ref(0);
let maxValue = ref(30);
const listEl = ref(null);
const usersToShow = 15;
const fetchingData = ref(null);
let searchValue = ref("");
let searchType = ref("Name");

const data = reactive({
  usersList: [],
});

const getUsers = async () => {
  const users = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${maxValue.value}&offset=${minValue.value}`
  );
  return users.data.results;
};

const getUsersOnScroll = async () => {
  await new Promise((res) => setTimeout(res, 2000));
  minValue.value = maxValue.value + 1;
  maxValue.value += 20;
  const newUsers = await getUsers();
  fetchingData.value = null;
  data.usersList.push(...newUsers);
};
const onScrollToEnd = () => {
  if (fetchingData.value === null) {
    fetchingData.value = getUsersOnScroll();
  }
};

useInfiniteScroll(listEl, async () => {
  await getUsersOnScroll();
},{
  distance: 10
});

const updateSearchValue = (newValue) => {
  searchValue.value = newValue;
};

const updateSearchType = (newValue) => {
  searchType.value = newValue;
};

onMounted(async () => {
  const newUsers = await getUsers(usersToShow, 0);
  data.usersList.push(...newUsers);
});

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
    <ul ref="listEl">
      <li v-for="user in data.usersList" :key="user.name">{{ user.name }}</li>
    </ul>
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
}
</style>
