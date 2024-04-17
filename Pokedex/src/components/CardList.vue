<script setup>
import Card from "./Card.vue";
import { onMounted, ref, computed, reactive } from "vue";
import axios from "axios";
import { useInfiniteScroll } from "@vueuse/core";
import { useStore } from "vuex"; 

let minValue = ref(0);
let maxValue = ref(0);
const listEl = ref(null);
const fetchingData = ref(null);
const store = useStore();
const pokeList = computed(() => store.state.pokeList)

console.log(pokeList.value)

const data = reactive({
  pokemonsList: [],
});

const getUsers = async () => {
  const users = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${maxValue.value}&offset=${minValue.value}`
  );
  return users.data.results;
};

const getUsersOnScroll = async () => {
  minValue.value = maxValue.value + 1;
  maxValue.value += 10;
  const newUsers = await getUsers();
  fetchingData.value = null;
  data.pokemonsList.push(...newUsers);
};

useInfiniteScroll(listEl, async () => {
  await getUsersOnScroll();
},{
  distance: 20
});

onMounted(async () => {
  const newUsers = await getUsers();
  data.pokemonsList.push(...newUsers);
});

const props = defineProps({
  pokemonsList: Array,
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
