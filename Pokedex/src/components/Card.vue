<script setup>
import { onMounted,defineProps,ref } from "vue";

const props = defineProps({
  pokemon: Object,
});

// onMounted(() => {
//   fetch("https://pokeapi.co/api/v2/pokemon/1")
//     .then((response) => response.json())
//     .then((response) => (console.log(response)));
// });

const urlSvg = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + props.pokemon.url.split('/')[6] + ".svg"
);


</script>

<template>
  <div class="card">
    <h2>{{ pokemon.name }}</h2>
    <div class="card-image">
        <img :src="urlSvg"/>
    </div>
    <div class="card-attributes">
      <p>Water</p>
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
