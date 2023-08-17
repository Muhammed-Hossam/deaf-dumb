<template>
  <section-container title="Privacy Policy">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-12 col-md-5">
          <div class="img">
            <img src="../../../assets/privacy/privacy-section.webp" class="w-100 rounded" height="350" alt="privacy image">
          </div>
        </div>
        <div class="col-12 col-md-7">
          <div class="card-wrapper">
            <card-container>
              <p class="h1 text-primary m-0">
                We take your privacy seriously and are committed to protecting your information.
              </p>
            </card-container>
          </div>
        </div>
      </div>
    </div>
  </section-container>
</template>

<script>
import SectionContainer from "../SectionContainer.vue";
import CardContainer from "../../common/CardContainer.vue";

export default {
  components: {
    SectionContainer,
    CardContainer
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  .card-container {
    padding: 1.5rem !important;
  }
}
</style>