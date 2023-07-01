<template>
  <div>
    <TheSlider />
    <ContentSection />
    <ContactSection />
    <AboutSection />
    <PrivacySection />
  </div>
</template>

<script>
import TheSlider from "../components/TheSlider.vue";
import ContentSection from "../components/home-sections/ContentSection.vue";
import ContactSection from "../components/home-sections/ContactSection.vue";
import AboutSection from "../components/home-sections/AboutSection.vue";
import PrivacySection from "@/components/home-sections/PrivacySection.vue";


export default {
  components: {
    TheSlider,
    ContentSection,
    ContactSection,
    AboutSection,
    PrivacySection,
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
