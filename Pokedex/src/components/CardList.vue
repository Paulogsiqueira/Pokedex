<script setup>
import Card from "./Card.vue";
import { onMounted, ref, computed, reactive } from "vue";
import axios from "axios";
import { useInfiniteScroll } from "@vueuse/core";

let minValue = ref(0);
let maxValue = ref(0);
const listEl = ref(null);
const fetchingData = ref(null);

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
  minValue.value = maxValue.value + 1;
  maxValue.value += 20;
  const newUsers = await getUsers();
  fetchingData.value = null;
  data.usersList.push(...newUsers);
};

useInfiniteScroll(listEl, async () => {
  await getUsersOnScroll();
},{
  distance: 10
});

onMounted(async () => {
  const newUsers = await getUsers();
  data.usersList.push(...newUsers);
});

const props = defineProps({
  pokemonsList: Array,
});

</script>

<template>
  <div class="cardList-fullContent">
    <ul ref="listEl" class="listContent">
      <li v-for="user in data.usersList" :key="user.name">{{ user.name }}</li>
    </ul>
    <div class="cardList">
      <ul ref="listEl" class="listContent">
        <Card
          v-for="pokemon in props.usersList"
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

.cardList-list {
  display: flex;
  flex-wrap: wrap;
}

.listContent{
  max-height: 100vh;
  overflow-y: auto;
}

.cardList-fullContent{
  border:1px solid red
}
</style>
