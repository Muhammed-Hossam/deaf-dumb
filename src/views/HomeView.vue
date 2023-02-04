<template>
  <div>
    <TheSlider />
    <hr>
    <service-section />
  </div>
</template>

<script>
import TheSlider from "../components/TheSlider.vue";
import ServiceSection from "../components/home-sections/ServiceSection.vue";
export default {
  components: {
    TheSlider,
    ServiceSection
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scope>
hr {
  margin: 2rem !important;
  border-width: 3px !important;
  border-color: #000 !important;
}
</style>
