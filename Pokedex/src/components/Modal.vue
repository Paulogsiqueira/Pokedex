<script setup lang="ts">
import { ref } from 'vue';
import { ModalsContainer, VueFinalModal } from 'vue-final-modal'


const getInitialValues = () => ({
    teleportTo: 'body',
    modelValue: false,
    displayDirective: 'if',
    hideOverlay: false,
    overlayTransition: 'vfm-fade',
    contentTransition: 'vfm-fade',
    clickToClose: true,
    escToClose: true,
    background: 'non-interactive',
    lockScroll: true,
    reserveScrollBarGap: true,
    swipeToClose: 'none',
  })

  const options = ref(getInitialValues())

  function reset() {
    options.value = getInitialValues()
  }
</script>

<template>
  <div>
    <button class="ml-auto" @click="options.modelValue = true">
        Open modal
    </button>
    <VueFinalModal
      v-model="options.modelValue"
      :teleport-to="options.teleportTo"
      :hide-overlay="options.hideOverlay"
      :overlay-transition="options.overlayTransition"
      :content-transition="options.contentTransition"
      :click-to-close="options.clickToClose"
      :esc-to-close="options.escToClose"
      :lock-scroll="options.lockScroll"
      :reserve-scroll-bar-gap="options.reserveScrollBarGap"
      content-class="mx-4 mt-5 p-4 bg-white border"
      id="testeModal"
    >
      <h1 class="text-xl distM">
        Hello World!
      </h1>
      <p>Magna deserunt nulla aliquip velit aute. Et occaecat elit nulla excepteur labore cupidatat. Duis culpa mollit commodo dolor qui Lorem qui laborum elit elit Lorem occaecat. Commodo eiusmod esse voluptate officia amet quis occaecat aliqua. Proident do irure amet ut occaecat dolor laboris consectetur.</p>
      <button @click="options.modelValue = false">
        Close
      </button>
    </VueFinalModal>
    <ModalsContainer />
  </div>
</template>

<style scoped>
.mx-4{
  margin-top:50%
}

#testeModal{
  margin-top:50px !important
}
</style>