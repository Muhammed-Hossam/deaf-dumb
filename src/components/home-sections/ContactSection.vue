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
              hrefValue="tel:+201556239800"
              value="01556239800"
            />
            <ContactMethod
              iconClass="fa-solid fa-envelope-circle-check"
              hrefValue="mailto:developer.muhamed@gmail.com"
              value="developer.muhamed@gmail.com"
            />
            <ContactMethod
              iconClass="fa-solid fa-location-dot"
              hrefValue="#"
              value="Mit-ghamr, Mansoura, Al-Daqahlia"
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
.container-fluid {
  .img {
    img {
      width: 100% !important;
      position: relative;
      width: 500px;
      height: 500px;
      animation: up-and-down 5s linear infinite;
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
    box-shadow: 0 1px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 100%;

    h2 {
      color: #02b1b4;
    }
  }
}
</style>
