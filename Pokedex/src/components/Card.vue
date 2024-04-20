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
};

const closeCard = () => {
  showModal.value = false;
};
</script>

<template>
  <div class="card">
    <button @click="openCard">Open</button>
    <h2>#{{ pokemonId }} - {{ pokemon.name }}</h2>
    <div class="card-image">
      <img :src="urlSvg" alt="Pokemon image" />
    </div>
    <Modal
      v-show="showModal"
      :pokemonId="pokemonId"
      :urlSvg="urlSvg"
      :closeCard="closeCard"
      :showModal="showModal"
    />
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border: 1px solid white;
  width: 30%;
  background: linear-gradient(#5c5c5c, #2f2f2f);
}
.card h2{
  color:white
}

.card-image img {
  height: 100px;
}
</style>
