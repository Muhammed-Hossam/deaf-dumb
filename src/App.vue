<template>
  <div>
    <header>
      <TheNavbar />
    </header>
    <router-view/>
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';
import TheFooter from './components/TheFooter.vue';
import { db } from './firebaseConfig';
export default {
  components: {
    TheNavbar,
    TheFooter
  },
  mounted() {
    console.log(db);
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
// @import "./scss/custom.scss";


#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Manrope', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
}

.background {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
}

</style>
