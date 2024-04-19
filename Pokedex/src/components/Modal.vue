<script setup lang="ts">
import { defineProps } from "vue";
import { ref } from "vue";
import { defineEmits } from 'vue'
const showModal = ref(false);

const emit = defineEmits(['openCard'])

const props = defineProps<{
  pokemonId: string;
  urlSvg: string;
}>();

const openCard = () => {
  showModal.value = true;
  console.log("ABRIR CARD")
  
}

const closeCard = () => {
  showModal.value = false;
}

</script>

<template>
  <div class="classe" v-show="showModal">
    <h1>Modal</h1>
    <button @click="closeCard">X</button>
    <div>
      <h2>{{ pokemonId }}</h2>
      <img :src="urlSvg" alt="Imagem do Pokémon" />
    </div>
  </div>
</template>

<style scoped>
.classe {
  position: absolute;
  background: rgb(255, 255, 255);
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 5px;
}
</style>
