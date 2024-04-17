<script setup>
import { onMounted, defineProps, ref, watchEffect } from "vue";

const props = defineProps({
  pokemon: Object,
});

const pokemonId = props.pokemon.url.split("/")[6];

const pokemonTypes = ref([]);
onMounted(() => {
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
    .then((response) => response.json())
    .then((response) => {
      pokemonTypes.value = response.types;
    });
});

const urlSvg = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +
    pokemonId +
    ".svg"
);

watchEffect(() => {
  pokemonTypes.value.forEach((type) => {
    console.log(type.type.name);
  });
});
</script>

<template>
  <div class="card">
    <h2>{{ pokemon.name }}</h2>
    <div class="card-image">
      <img :src="urlSvg" />
    </div>
    <div class="card-attributes">
      <ul>
        <li v-for="(type, index) in pokemonTypes.value" :key="index">
        {{ type.type.name }}
      </li>
      </ul>
    </div>
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
