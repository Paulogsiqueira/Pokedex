<script setup>
import { ref, onMounted, computed} from "vue";

const pokemonsType = ref([])

onMounted(() => {
  fetch("https://pokeapi.co/api/v2/type")
    .then((response) => response.json())
    .then((response) => response.results.map((type) => pokemonsType.value.push(type.name)));
});


const searchType = ref('Name')
const searchValue = ref('')

const changeSearchType = ( newType ) =>{
    searchType.value = newType
    emits("updateSearchType",newType)
}


const updateSearchValue = (newValue) => {
  searchValue.value = newValue;
  console.log(searchValue.value)
};

const updateSearchType = (newValue) => {
  searchType.value = newValue;
};

const pokemonsFiltered = computed(() => {
  if (data.usersList && searchValue.value) {
    if (searchType.value == "Name") {
      return data.usersList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    } else if (searchType.value == "Id") {
      return data.usersList.filter(
        (pokemon) => pokemon.url.split("/")[6] == searchValue.value
      );
    }
  }
  return data.usersList;
});
</script>

<template>
  <div class="inputFilter">
    <div class="input-group mb-3">
      <input
        @input="updateSearchValue($event.target.value)"
        type="text"
        class="inputFilter-input"
        aria-label="Text input with dropdown button"
      />
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ searchType }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" @click="changeSearchType('Name')" href="#">Name</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" @click="changeSearchType('Id')" href="#">Id</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" @click="changeSearchType('Type')" href="#">Type</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" @click="changeSearchType('Species')" href="#">Species</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.inputFilter {
  width: 60%;
}

.inputFilter-input {
  width: 80%;
  border: 1px solid black;
  border-radius: 10px 10px 10px 10px;
}
</style>
