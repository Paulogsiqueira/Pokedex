<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  searchPokemon: String,
  updateSearchValue: Function,
  updateSearchType: Function,
});

const emits = defineEmits(['updateSearchType','updateSearchValue'])

const searchType = ref('Name')
const changeSearchType = ( newType ) =>{
    searchType.value = newType
    emits("updateSearchType",newType)
}

</script>

<template>
  <div class="inputFilter">
    <div class="input-group mb-3">
      <input
        @input="$emit('updateSearchValue', $event.target.value)"
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
