<script setup>
import CardList from "./components/CardList.vue";
import InputFilter from "./components/InputFilter.vue";

</script>

<template>
  <div class="fullContent">
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
}

</style>
