<script setup>
import CardList from "./components/CardList.vue";
import InputFilter from "./components/InputFilter.vue";
import { useStore } from "vuex/dist/vuex.cjs.js";
import { languagesOptions } from "./data/languages";

const languages = Object.keys(languagesOptions);
const store = useStore();

const chanceLanguage = (language) => {
  store.commit("EDIT_LANGUAGE", language);
};

</script>

<template>
  <div class="fullContent">
    <div class="navbar">
      <ul>
        <li v-for="language in languages" :key="language">
          <button @click="chanceLanguage(language)">{{ language }}</button>
        </li>
      </ul>
    </div>
    <h1>Pokedex</h1>
    <InputFilter />
    <CardList />
  </div>
</template>

<style scoped>

.fullContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
  background: linear-gradient(#555555, #000000);
}

.fullContent h1 {
  color: #ffce4b;
  font-weight: bold;
  font-family: "Teko", "Helvetica";
  font-size: 60px;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 0px;
}

.navbar ul {
  display: flex;
  list-style: none;
  margin: 0px;
}
</style>
