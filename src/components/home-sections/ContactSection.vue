<template>
  <section-container title="Contact Us">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="img">
            <img src="../../assets/contact/contact-us-section-img.png" alt="" />
          </div>
        </div>
        <div class="col-12 col-md-7">
          <div class="contact-info mx-auto mt-4 py-5">
            <h2 class="fs-1 mb-5 text-center fw-bolder">Contact Info</h2>
            <ContactMethod
              iconClass="fa-solid fa-phone-volume"
              hrefValue="tel:+201007876406"
              value="01007876406"
            />
            <ContactMethod
              iconClass="fa-solid fa-envelope-circle-check"
              hrefValue="mailto:alhwartmhmd@gmail.com"
              value="alhwartmhmd@gmail.com"
            />
            <ContactMethod
              iconClass="fa-solid fa-location-dot"
              hrefValue="https://goo.gl/maps/Tf2mv4XMkFWBasCBA"
              target="_blank"
              value="Dondiat, Mit-Ghamr, Al-Daqahlia"
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
export default {
  components: {
    SectionContainer,
    ContactMethod,
  },
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
      color: #02b1b4;
    }
  }
}
</style>
