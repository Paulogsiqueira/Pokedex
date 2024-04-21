<script setup>
import CardList from "./components/CardList.vue";
import InputFilter from "./components/InputFilter.vue";
import { useStore } from "vuex/dist/vuex.cjs.js";
import { languagesOptions } from "./data/languages";
import { computed } from "vue";

const languages = Object.keys(languagesOptions);
const store = useStore();
const selectedLanguage = computed(() => store.getters.getLanguage);

const chanceLanguage = (language) => {
  store.commit("EDIT_LANGUAGE", language);
};
</script>

<template>
  <div class="fullContent">
    <div class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item" v-for="language in languages" :key="language">
          <button
            class="navbar-button"
            v-bind:class="{
              'navbar-button__clicked': language == selectedLanguage,
            }"
            @click="chanceLanguage(language)"
          >
            {{ language }}
          </button>
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
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: center;
  padding-bottom: 100px;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(#555555, #000000);
}

.fullContent h1 {
  font-size: 60px;
  font-weight: bold;
  color: #ffce4b;
  font-family: "Teko", "Helvetica";
}

.navbar {
  top: 0;
  width: 100%;
  padding: 0px;
  display: flex;
  position: absolute;
  justify-content: end;
}

.navbar-list {
  display: flex;
  list-style: none;
  margin-top: -4px;
}

.navbar-button {
  font-weight: bold;
  border-radius: 5px;
  color: #909090;
  border: 2px solid white;
  background-color: #ffce4b;
}

.navbar-button__clicked {
  background-color: #ff8c38;
}

@media (max-width: 450px) {
  .navbar-button {
    font-size: 12px;
  }
}

@media (max-width: 400px) {
  .navbar-button {
    font-size: 10px;
  }
  .navbar-list {
    margin-top: -7px;
  }
}
</style>
