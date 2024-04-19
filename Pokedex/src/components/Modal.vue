<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { getPokemonCharacteristics, getPokemonEvolution } from "../methods/methods";

const props = defineProps<{
  pokemonId: string;
  urlSvg: string;
  showModal: boolean;
  closeCard: () => {};
}>();

const pokemonSprites = ref<string[]>([]);
const pokemonMoves = ref<string[]>([]);
const pokemonName = ref("");

const showModalRef = () => props.showModal;

watch(showModalRef, async (newValue) => {
  if (newValue) {
    const pokemon = await getPokemonCharacteristics(props.pokemonId);
    const pokemonEvolution = await getPokemonEvolution(props.pokemonId)

    // - Get name
    pokemonName.value = pokemon.name;

    // - Get all moves
    pokemon.moves.forEach((move) => pokemonMoves.value.push(move.move.name));

    // - Get stats

    // - Get all sprites
    const sprites = pokemon.sprites;
    Object.values(sprites).forEach((value) => {
      if (typeof value === "string" && value.includes("http")) {
        pokemonSprites.value.push(value);
      }
    });
  }
});
</script>

<template>
  <div class="classe">
    <h1>Modal</h1>
    <button @click="closeCard">X</button>
    <div>
      <h2>{{ pokemonId }}</h2>
      <img :src="urlSvg" alt="Imagem do Pokémon" />
    </div>
  </div>
</template>

<style scoped>
.classe {
  z-index: 1;
  position: absolute;
  background: rgb(255, 255, 255);
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 5px;
}
</style>
