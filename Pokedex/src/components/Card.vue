<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";
const showModal = ref(false);

const props = defineProps({
  pokemon: Object,
});
const pokemonId = props.pokemon.url.split("/")[6];
const urlSvg = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +
    pokemonId +
    ".svg"
);

const openCard = () => {
  showModal.value = true;
}

const closeCard = () => {
  showModal.value = false;
}


</script>

<template>
  <div class="card">
    <button @click="openCard">Open</button>
    <h2>{{ pokemon.name }}</h2>
    <div class="card-image">
      <img :src="urlSvg" />
    </div>
    <Modal v-show="showModal" :pokemonId="pokemonId" :urlSvg="urlSvg" :closeCard="closeCard" :showModal="showModal"/>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border: 1px solid blue;
  width: 30%;
}
.card-image img {
  height: 100px;
}
</style>
