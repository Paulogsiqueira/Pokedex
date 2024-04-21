<script setup>
import { languagesOptions } from "../data/languages";
import { useStore } from "vuex/dist/vuex.cjs.js";
import { computed, ref, watch } from "vue";

const store = useStore();
const language = computed(() => store.getters.getLanguage);
const textInDifferentLanguages = ref(languagesOptions[language.value]);
const searchOption = computed(() =>
  store.getters.getSearchOption.toLowerCase()
);

watch(
  language,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      textInDifferentLanguages.value = languagesOptions[newVal];
    }
  },
  { immediate: true }
);

const updateSearchValue = (value) => {
  store.commit("EDIT_SEARCH_VALUE", value);
};

const updateSearchOption = (option) => {
  store.commit("EDIT_SEARCH_OPTION", option);
};

const searchSubmit = () => {
  store.commit("ADD_FILTER_OPTIONS");
};
</script>

<template>
  <div class="inputFilter">
    <div class="input-group mb-3 inputFilter-content">
      <input
        @input="updateSearchValue($event.target.value)"
        type="text"
        class="inputFilter-input"
        aria-label="Text input with dropdown button"
        @keyup.enter="searchSubmit"
      />
      <button
        class="btn btn-outline-secondary dropdown-toggle dropdown-filter"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ textInDifferentLanguages[searchOption] }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end dropdown-filter">
        <li>
          <a
            class="dropdown-item"
            @click="updateSearchOption('Name')"
            href="#"
            >{{ textInDifferentLanguages["name"] }}</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item" @click="updateSearchOption('Id')" href="#"
            >{{ textInDifferentLanguages["id"] }}</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a
            class="dropdown-item"
            @click="updateSearchOption('Type')"
            href="#"
            >{{ textInDifferentLanguages["type"] }}</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a
            class="dropdown-item"
            @click="updateSearchOption('Species')"
            href="#"
            >{{ textInDifferentLanguages["species"] }}</a
          >
        </li>
      </ul>
      <button class="dropdown-button" @click="searchSubmit()">
        {{ textInDifferentLanguages["search"] }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.inputFilter {
  width: 60%;
}

.inputFilter-content {
  display: flex;
  justify-content: center;
}

.inputFilter-input {
  width: 60%;
  padding: 0 0.5rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 10px 10px 10px 10px;
}

.inputFilter-input:focus{
  outline: none;
}

.dropdown-filter {
  border: 1px solid black;
  background-color: #d7d7d7;
}

.dropdown-button {
  padding: 0px 10px;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid black;
  background-color: #ffce4b;
}

.dropdown-button:hover{
  background-color: #ff8c38;
}

@media (max-width: 800px) {
  .inputFilter {
    width: 80%;
  }
}

@media (max-width: 550px) {
  .inputFilter {
    width: 95%;
  }
  .dropdown-filter {
    font-size: 14px;
  }
}

@media (max-width: 450px) {
  .dropdown-filter {
    font-size: 10px;
  }
  .dropdown-button {
    font-size:14px;
    padding: 0px 5px;
  }
}
</style>
