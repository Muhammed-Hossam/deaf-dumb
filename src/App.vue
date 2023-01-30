<template>
  <header>
    <TheNavbar />
  </header>
  <router-view/>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';
export default {
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Manrope', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
