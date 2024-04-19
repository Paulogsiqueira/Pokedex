<script setup>
import CardList from "./components/CardList.vue";
import InputFilter from "./components/InputFilter.vue";
import { useStore } from "vuex/dist/vuex.cjs.js";

const languages = ["PT","EN","ES"]
const store = useStore();

const chanceLanguage = (language) =>{
  store.commit("EDIT_LANGUAGE", language)
}
</script>

<template>
  <div class="fullContent">
    <ul class="navbar">
      <li v-for="language in languages" :key="language">
        <button @click="chanceLanguage(language)">{{ language }}</button>
      </li>
    </ul>
    <h1>Pokedex</h1>
    <InputFilter/>
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
  max-height: 100vh;
  margin-top:150px
}

.navbar{
  display: flex;
  list-style: none;
}

</style>
