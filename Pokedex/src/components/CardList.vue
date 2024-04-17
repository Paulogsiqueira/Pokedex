<script setup>
import { ref } from "vue";
import Card from "./Card.vue";

const props = defineProps({
  pokemonsList: Array,
});

</script>

<template>
  <div>
    <div class="cardList">
      <ul class="cardList-list">
        <Card
          v-for="pokemon in props.pokemonsList"
          :key="pokemon.name"
          :pokemon="pokemon"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cardList {
  display: flex;
  width: 90%;
  margin-left: 5%;
}

.cardList-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
