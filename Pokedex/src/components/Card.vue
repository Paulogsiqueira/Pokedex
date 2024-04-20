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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
  <div class="card">
    <h2>#{{ pokemonId }} - {{ capitalizeFirstLetter(pokemon.name) }}</h2>
    <div class="card-image">
      <img :src="urlSvg" alt="Pokemon image" />
    </div>
    <button @click="openCard">More Info</button>
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

.card button{
  border-radius:10px;
  background-color: #FFCE4B;
  border: none;
  margin: 15px 0;
  font-weight: bold;
  padding: 0 15px;
}

.card button:hover{
background-color: #FF8C38 ;
transform: scale(1.1)
}

.card-image img {
  height: 100px;
}
</style>
