<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { languagesOptions } from "../data/languages";
import { getPokemonsName } from "../service/pokemonService";
import { useStore } from "vuex/dist/vuex.cjs.js";
import Modal from "./Modal.vue";

const store = useStore();
const showModal = ref(false);
const pokemonName = ref("");
const language = computed(() =>  store.getters.getLanguage);
const textInDifferentLanguages = ref(languagesOptions[language.value]);
const props = defineProps({
  pokemon: Object,
});

const pokemonId = props.pokemon.url.split("/")[6];
const urlSvg = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
    pokemonId +
    ".png"
);

onMounted(async () => {
  pokemonName.value = await getPokemonsName(pokemonId, language);
});

watch(
  language,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      textInDifferentLanguages.value = languagesOptions[newVal];
      pokemonName.value = await getPokemonsName(pokemonId, language);
    }
  },
  { immediate: true }
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
    <p class="card-id">#{{ pokemonId }}</p>
    <h2>{{ pokemonName ? pokemonName : pokemon.name }}</h2>
    <div class="card-image">
      <img :src="urlSvg" alt="Pokemon image" />
    </div>
    <button @click="openCard">
      {{ textInDifferentLanguages["moreInfo"] }}
    </button>
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
  width: 30%;
  margin: 10px;
  display: flex;
  min-width: 230px;
  position: relative;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ffffff;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  background: linear-gradient(#555555, #2f2f2f);
}

.card:hover {
  border: 1px solid #ffce4b;
}

.card-id {
  left: 2%;
  margin: 0px;
  position: absolute;
  color: #ffffff;
  font-family: "Wellfleet", monospace;
}

.card h2 {
  max-width: 60%;
  margin-top: 5px;
  font-size: 30px;
  color: #ffffff;
  font-family: "Wellfleet", monospace;
}

.card button {
  border: none;
  margin: 15px 0;
  padding: 0 15px;
  font-weight: bold;
  border-radius: 10px;
  background-color: #ffce4b;
}

.card button:hover {
  transform: scale(1.1);
  color: white;
  background-color: #ff8c38;
}

.card-image img {
  height: 6rem;
}

@media (max-width: 1200px) {
  .card h2 {
    font-size: 24px;
  }
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

@media (max-width: 610px) {
  .card {
    width: 60%;
  }
}
</style>
