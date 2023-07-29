<template>
  <section-container title="Contact Us">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="img">
            <img src="../../assets/contact/contact-us-section-img.webp" alt="" />
          </div>
        </div>
        <div class="col-12 col-md-7">
          <div class="contact-info mx-auto mt-4 py-5">
            <h2 class="fs-1 mb-5 text-center fw-bolder">Contact Info</h2>
            <ContactMethod
              iconClass="fa-solid fa-phone-volume"
              hrefValue="tel:+201556239800"
              value="01556239800"
              data-aos="fade-left"
              data-aos-delay="300"
            />
            <ContactMethod
              iconClass="fa-solid fa-envelope-circle-check"
              hrefValue="mailto:developer.muhamed@gmail.com"
              value="developer.muhamed@gmail.com"
              data-aos="fade-left"
              data-aos-delay="600"
            />
            <ContactMethod
              iconClass="fa-solid fa-location-dot"
              hrefValue="https://goo.gl/maps/P7NL9SoGnrXrqQkD8"
              target="_blank"
              value="Al-Mansoura, Al-Daqahlia, Egypt"
              data-aos="fade-left"
              data-aos-delay="900"
            />
          </div>
        </div>
      </div>
    </div>
  </section-container>
</template>

<script>
import SectionContainer from "../SectionContainer.vue";
import ContactMethod from "../ContactMethod.vue";

import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  components: {
    SectionContainer,
    ContactMethod,
  },

  mounted() {
    AOS.init();
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

.container-fluid {
  .img {
    img {
      width: 100% !important;
      position: relative;
      width: 500px;
      height: 500px;
      animation: up-and-down 5.5s linear infinite;
    }

    @keyframes up-and-down {
      0%,
      100% {
        top: 0;
      }
      50% {
        top: -50px;
      }
    }
  }
  .contact-info {
    padding: 1rem;
    box-shadow: $main-shadow;
    border-radius: 5px;
    width: 100%;

    h2 {
      color: $main-color;
    }
  }
}
</style>
