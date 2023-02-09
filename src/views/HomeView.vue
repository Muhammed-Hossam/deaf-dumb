<template>
  <div>
    <TheSlider />
    <hr>
    <service-section />
    <hr>
    <ContactSection />
    <hr>
    <AboutSection />
  </div>
</template>

<script>
import TheSlider from "../components/TheSlider.vue";
import ServiceSection from "../components/home-sections/ContentSection.vue";
import ContactSection from "../components/home-sections/ContactSection.vue";
import AboutSection from "../components/home-sections/AboutSection.vue"

export default {
  components: {
    TheSlider,
    ServiceSection,
    ContactSection,
    AboutSection
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
