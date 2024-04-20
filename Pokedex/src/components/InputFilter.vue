<script setup>
import { computed } from "vue";
import { useStore } from "vuex/dist/vuex.cjs.js";
const store = useStore();
const searchOption = computed(() => store.getters.getSearchOption);

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
      />
      <button
        class="btn btn-outline-secondary dropdown-toggle dropdown-filter"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ searchOption }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end dropdown-filter">
        <li>
          <a class="dropdown-item" @click="updateSearchOption('Name')" href="#"
            >Name</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item" @click="updateSearchOption('Id')" href="#"
            >Id</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a class="dropdown-item" @click="updateSearchOption('Type')" href="#"
            >Type</a
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <a
            class="dropdown-item"
            @click="updateSearchOption('Species')"
            href="#"
            >Species</a
          >
        </li>
      </ul>
      <button class="dropdown-button" @click="searchSubmit()">Search</button>
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
  border: 1px solid black;
  border-radius: 10px 10px 10px 10px;
  background-color: #d7d7d7;
}

.dropdown-filter {
  background-color: #d7d7d7;
  border:1px solid black
}

.dropdown-button {
  background-color: #d7d7d7;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: bold;
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
    font-size: 12px;
  }
}
</style>
