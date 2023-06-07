<template>
  <div>
    <TheSlider />
    <ContentSection
      data-aos="zoom-in-up"
      data-aos-duration="1200"
      data-aos-delay="300"
      data-aos-offset="150"
      data-aos-easing="ease-in-out"
    />
    <ContactSection 
      data-aos="zoom-in-up"
      data-aos-duration="1200"
      data-aos-delay="300"
      data-aos-offset="150"
      data-aos-easing="ease-in-out"
    />
    <AboutSection 
      data-aos="zoom-in-up"
      data-aos-duration="1200"
      data-aos-delay="300"
      data-aos-offset="150"
      data-aos-easing="ease-in-out"
    />
    <PrivacySection 
      data-aos="zoom-in-up"
      data-aos-duration="1200"
      data-aos-delay="300"
      data-aos-offset="150"
      data-aos-easing="ease-in-out"
    />
  </div>
</template>

<script>
import TheSlider from "../components/TheSlider.vue";
import ContentSection from "../components/home-sections/ContentSection.vue";
import ContactSection from "../components/home-sections/ContactSection.vue";
import AboutSection from "../components/home-sections/AboutSection.vue";
import PrivacySection from "@/components/home-sections/PrivacySection.vue";

import AOS from "aos";
import "aos/dist/aos.css";

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

  mounted() {
    AOS.init();
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
