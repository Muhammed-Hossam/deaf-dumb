<template>
  <div class="overlay" v-if="show"></div>
</template>

<script>
export default {
  name: 'Overlay-component',
  props: {
    show: Boolean
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  /* z-index: 1000; Adjust as needed */
}
</style>
