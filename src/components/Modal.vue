<script setup>
import { computed, ref, watch } from "vue";
import { dataTypes } from "../data/pokemonTypes";
import { languagesOptions } from "../data/languages";
import { useStore } from "vuex/dist/vuex.cjs.js";
import {
  getPokemonCharacteristics,
  getPokemonEvolutions,
  getPokemonsName,
} from "../service/pokemonService";

const store = useStore();
const pokemonName = ref("");
const pokemonMoves = ref([]);
const pokemonTypes = ref([]);
const pokemonSprites = ref([]);
const pokemonEvolutions = ref([]);
const pokemonGameIndices = ref([]);
const language = computed(() => store.getters.getLanguage);
const textInDifferentLanguages = ref(languagesOptions[language.value]);
const props = defineProps({
  pokemonId: String,
  urlSvg: String,
  showModal: Boolean,
  closeCard: Function,
});

const showModalRef = () => props.showModal;

watch(
  language,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      textInDifferentLanguages.value = languagesOptions[newVal];
    }
  },
  { immediate: true }
);

const getImageUrl = (name) => {
  return `/icons/${name}.svg`;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

watch(showModalRef, async (newValue) => {
  if (newValue) {
    pokemonName.value = await getPokemonsName(props.pokemonId, language);
    const pokemon = await getPokemonCharacteristics(props.pokemonId);
    pokemonEvolutions.value = await getPokemonEvolutions(props.pokemonId);

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
  <div>
    <div id="fade" @click="closeCard"></div>
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
              <img
                :src="type"
                alt="Pokemon in different postions and in shiny appearance"
              />
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
                <p>{{ textInDifferentLanguages[type] }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="card-evolution__content">
          <p class="card-evolution__title">
            {{ textInDifferentLanguages["evolutions"] }}
          </p>
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
            <p>{{ textInDifferentLanguages["attackMoves"] }}</p>
            <div class="card-list">
              <ul class="card-list__list">
                <li v-for="(move, index) in pokemonMoves" :key="index">
                  {{ capitalizeFirstLetter(move) }}
                </li>
              </ul>
            </div>
          </div>
          <div class="card-list__content second-list">
            <p>{{ textInDifferentLanguages["gameIndices"] }}</p>
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
  </div>
</template>

<style scoped>
.pokemonCard {
  top: 50%;
  left: 50%;
  z-index: 5000;
  position: fixed;
  border-radius: 5px;
  display: inline-block;
  transform: translate(-50%, -50%);
  border: 2px solid #ffce4b;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.9);
  background: linear-gradient(#555555, #2f2f2f);
  max-width: 25rem;
}

.pokemonCard-content {
  min-width: 350px;
  padding: 0 0.5rem 0.5rem 0.5rem;
}

.card-button {
  width: 100%;
  display: flex;
  justify-content: end;
}
.card-button button {
  height: 20px;
  color: white;
  font-size: 10px;
  font-weight: bold;
  border-radius: 4px;
  border: 1px solid #909090;
  background-color: #da5656;
}

.card-title {
  display: flex;
  color: #ffce4b;
  margin-right: 0.5rem;
  justify-content: center;
  font-family: "Wellfleet", monospace;
}

.card-img {
  display: flex;
  padding: 20px;
  margin-right: 0.5rem;
  justify-content: center;
  background-color: #d7d7d7;
}

.card-img img {
  width: 150px;
}
.card-sprites__list {
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  list-style: none;
  justify-content: center;
}

.card-sprites__list li {
  margin: 0 2px;
}

.card-sprites__list img {
  width: 5rem;
  border-radius: 10px;
  background-color: #d7d7d7;
}

.card-sprites__list img:hover{
  transform: scale(1.1);
  border:1px solid white;

}

.card-type__list {
  padding: 0px;
  display: flex;
  list-style: none;
  margin-top: 10px;
  justify-content: start;
}
.card-type__item {
  display: flex;
  max-height: 30px;
  margin-right: 5px;
  border-radius: 10px;
  justify-content: center;
  padding: 1px 10px 1px 10px;
  border: 1px solid #808080;
}
.card-type__item p {
  margin-left: 5px;
  color: white;
  font-weight: bold;
}

.card-type__item img {
  width: 20px;
}

.card-evolution__title {
  margin-left: 5%;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 0px;
  color: #d7d7d7;
}
.card-evolution__list {
  list-style: none;
}

.card-evolution__list p {
  margin: 0px;
  color: #d7d7d7;
}

.card-list__content {
  width: 40%;
  min-width: 145px;
}
.card-list__content p {
  margin-top: 10px;
  color: #d7d7d7;
  font-weight: bold;
  margin-bottom: 0px;
}

.second-list {
  margin-left: 10%;
}

.card-lists {
  display: flex;
  margin-left: 5%;
  justify-content: start;
}

.card-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 100px;
  border-radius: 5px;
  border: 1px solid #909090;
  background-color: #90909099;
}

.card-list__list {
  margin-top: 10px;
}

.card-list__list li {
  font-size: 14px;
  font-weight: 500;
  color: #d7d7d7;
}

#fade {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 800px) {
  .card-sprites__list img {
    width: 60px;
  }

  .card-img {
    padding: 0px 10px;
  }
}

@media (max-width: 550px) {
  .card-lists {
    margin-left: 2%;
  }

}
</style>
