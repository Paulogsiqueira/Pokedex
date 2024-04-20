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
    <p class="card-id">#{{ pokemonId }}</p>
    <h2>{{ capitalizeFirstLetter(pokemon.name) }}</h2>
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
  border: 1px solid #FFFFFF;
  width: 30%;
  background: linear-gradient(#555555, #2f2f2f);
}

.card-id {
  margin: 0px;
  position: absolute;
  left: 2%;
  color: #FFFFFF;
  font-family: "Wellfleet", monospace;
}

.card h2 {
  color: #FFFFFF;
  font-family: "Wellfleet", monospace;
  margin-top:5px
}

.card button {
  border-radius: 10px;
  background-color: #ffce4b;
  border: none;
  margin: 15px 0;
  font-weight: bold;
  padding: 0 15px;
}

.card button:hover {
  background-color: #ff8c38;
  transform: scale(1.1);
}

.card-image img {
  height: 6rem;
}

@media (max-width: 1000px) {
  .card {
    width: 40%;
  }

  .card h2 {
    font-size: 20px;
  }

  .card-id {
    font-size: 14px;
  }
}

@media (max-width: 900px) {
  .card-image img {
    height: 4rem;
  }
}

@media (max-width: 550px) {
  .card h2 {
    font-size: 16px;
  }

  .card-id {
    font-size: 12px;
  }
}

@media (max-width: 450px) {
  .card h2 {
    font-size: 12px;
  }

  .card-id {
    font-size: 10px;
  }
}

@media (max-width: 400px) {
  .card h2 {
    font-size: 10px;
  }

  .card-id {
    font-size: 8px;
  }
}
</style>
