<script setup>
import { onMounted, ref, watchEffect, reactive } from "vue";

const props = defineProps({
  pokemon: Object,
});
const pokemonId = props.pokemon.url.split("/")[6];
const urlSvg = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" +
    pokemonId +
    ".svg"
);

const data = reactive({
  pokemonTypes: [],
  typesArray: [],
});

// onMounted(() => {
//   fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
//     .then((response) => response.json())
//     .then((response) => {
//       data.pokemonTypes = response.types;
//     });
// });

// watchEffect(() => {
//   data.typesArray = data.pokemonTypes.map((item) => item.type.name);
// });
</script>

<template>
  <div class="card">
    <h2>{{ pokemon.name }}</h2>
    <div class="card-image">
      <img :src="urlSvg" />
    </div>
    <div class="card-attributes">
      <!--
        <ul v-if="data.typesArray.length > 0">
          <li v-for="(type, index) in data.typesArray" :key="index">
            {{ type }}
          </li>
        </ul>
      -->
      
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
