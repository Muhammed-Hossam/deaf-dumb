<template>
  <div>
    <section>
      <TheSlider />
    </section>
    <section class="services">

    </section>
  </div>
</template>

<script>
import TheSlider from '../components/TheSlider.vue';
export default {
  components: {
    TheSlider
  },
  data() {
    return {};
  },
};
</script>

<style>
.services {
  background-image: url('../assets/download.svg');
  height: 300px;
  /* background-repeat: repeat; */
}
</style>