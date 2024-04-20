<script setup>
import { defineProps, ref, watch } from "vue";
import {
  getPokemonCharacteristics,
  getPokemonEvolutions,
} from "../methods/methods";
import { dataTypes } from "../data/data";

const props = defineProps({
  pokemonId: String,
  urlSvg: String,
  showModal: Boolean,
  closeCard: Function,
});

const getImageUrl = (name) => {
  return `../public/icons/${name}.svg`;
};

const pokemonSprites = ref([]);
const pokemonMoves = ref([]);
const pokemonGameIndices = ref([]);
const pokemonEvolutions = ref([]);
const pokemonTypes = ref([]);
const pokemonName = ref("");

const showModalRef = () => props.showModal;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

watch(showModalRef, async (newValue) => {
  if (newValue) {
    const pokemon = await getPokemonCharacteristics(props.pokemonId);
    pokemonEvolutions.value = await getPokemonEvolutions(props.pokemonId);

    // - Get name
    pokemonName.value = capitalizeFirstLetter(pokemon.name);

    // - Get all moves
    pokemonMoves.value = pokemon.moves.map((move) => move.move.name);

    // - Get all game indices
    pokemonGameIndices.value = pokemon.game_indices.map(
      (indice) => indice.version.name
    );

    // - Get types
    pokemonTypes.value = pokemon.types.map((type) => type.type.name);

    // - Get all sprites
    const sprites = pokemon.sprites;
    if (sprites) {
      pokemonSprites.value = Object.values(sprites).filter(
        (value) => value != null && typeof value == "string"
      );
    }
  }
});
</script>

<template>
  <div class="pokemonCard">
    <div class="card-button">
      <button @click="closeCard">X</button>
    </div>
    <div class="pokemonCard-content">
      <h1 class="card-title">{{ pokemonName }}</h1>
      <div class="card-img">
        <img :src="urlSvg" alt="Pokemon image" />
      </div>
      <div class="card-sprites">
        <ul class="card-sprites__list">
          <li v-for="(type, index) in pokemonSprites" :key="index">
            <img :src="type" alt="Pokemon in different postions and in shiny appearance"/>
          </li>
        </ul>
      </div>
      <div class="card-types">
        <ul class="card-type__list">
          <li v-for="(type, index) in pokemonTypes" :key="index">
            <div
              class="card-type__item"
              :style="'background-color:' + dataTypes[type].color"
            >
              <img :src="getImageUrl(type)" />
              <p>{{ type }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="card-evolution__content">
        <p class="card-evolution__title">Evolutions</p>
        <div class="card-evolution">
          <ul class="card-evolution__list">
            <li v-for="(evolution, index) in pokemonEvolutions" :key="index">
              <p>{{ index + 1 }}ª - {{ capitalizeFirstLetter(evolution) }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="card-lists">
        <div class="card-list__content">
          <p>Attack Moves</p>
          <div class="card-list">
            <ul class="card-list__list">
              <li v-for="(move, index) in pokemonMoves" :key="index">
                {{ capitalizeFirstLetter(move) }}
              </li>
            </ul>
          </div>
        </div>
        <div class="card-list__content second-list">
          <p>Game Indices</p>
          <div class="card-list">
            <ul class="card-list__list">
              <li
                v-for="(gameIndices, index) in pokemonGameIndices"
                :key="index"
              >
                {{ capitalizeFirstLetter(gameIndices) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemonCard {
  z-index: 5000;
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(227, 227, 227);
  border: 2px solid grey;
  border-radius: 5px;
}

.pokemonCard-content {
  padding: 0 0.5rem 0.5rem 0.5rem;
  min-width: 400px;
}

.card-button {
  display: flex;
  width: 100%;
  justify-content: end;
}
.card-button button {
  font-size: 10px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgb(179, 179, 179);
  background-color: rgb(218, 86, 86);
  color: white;
  font-weight: bold;
}

.card-title {
  display: flex;
  justify-content: center;
  margin-right: 0.5rem;
  color: grey;
}

.card-img {
  display: flex;
  justify-content: center;
  background: white;
  padding: 20px;
  margin-right: 0.5rem;
}

.card-img img {
  width: 150px;
}
.card-sprites__list {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0px;
  margin-top: 5px;
}

.card-sprites__list li {
  margin: 0 2px;
}

.card-sprites__list img {
  background-color: white;
  width: 5rem;
  border-radius: 10px;
}

.card-type__list {
  display: flex;
  justify-content: start;
  list-style: none;
  padding: 0px;
  margin-top: 10px;
}
.card-type__item {
  display: flex;
  justify-content: center;
  border: 1px solid gray;
  padding: 1px 10px 1px 10px;
  border-radius: 10px;
  margin-right: 5px;
  max-height: 30px;
}
.card-type__item p {
  color: white;
  font-weight: bold;
  margin-left: 5px;
}

.card-type__item img {
  width: 20px;
}

.card-evolution__title {
  margin-left: 5%;
  margin-top: 10px;
  margin-bottom: 0px;
  font-weight: bold;
}
.card-evolution__list {
  list-style: none;
}

.card-evolution__list p {
  margin: 0px;
}

.card-list__content {
  width: 40%;
  min-width: 145px;
}
.card-list__content p {
  margin-top: 10px;
  margin-bottom: 0px;
  font-weight: bold;
}

.second-list {
  margin-left: 10%;
}

.card-lists {
  display: flex;
  justify-content: start;
  margin-left: 5%;
}

.card-list {
  max-height: 100px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 5px;
  background-color: rgb(207, 207, 207);
  width: 100%;
}

.card-list__list {
  margin-top: 10px;
}

.card-list__list li {
  font-size: 14px;
  color: rgb(78, 78, 78);
  font-weight: 500;
}
</style>
