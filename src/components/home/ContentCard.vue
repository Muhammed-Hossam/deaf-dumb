<template>
  <div class="card mb-3 px-0">
  <div class="row g-0">
    <div class="col-lg-4">
      <img :src="cardImg" class="img-fluid rounded-start h-100" :alt="alt">
    </div>
    <div class="col-lg-8">
      <div class="card-body">
        <div class="h5 card-title text-center">{{ cardTitle }}</div>
        <p class="card-text text-center">{{ cardText }}</p>
        <router-link class="learn-more text-decoration-none" :to="link">learn more <font-awesome-icon icon="fa-solid fa-arrow-right-long" /></router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  props: ['cardImg', 'alt', 'cardTitle', 'cardText', 'link'],
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

.card {
  height: fit-content;

  @media (min-width: 992px) {
    width: 26.25rem;
  }

  .card-body {
    text-align: initial;
  }

  .fa-arrow-right-long {
    transition: all 0.5s ease-in-out;
    }

  a:hover {
    .fa-arrow-right-long {
      margin-left: 0.5rem;
    }
  }
  @include media-breakpoint-down(sm) {
    .card-body {
      .card-title {
        font-size: 2rem;
      }
      .card-text {
        font-size: 1.3rem;
      }
    }
  }

  @include media-breakpoint-only(md) {
    .card-body {
      .card-title {
        font-size: 4rem;
      }
      .card-text {
        font-size: 2.5rem;
      }
      .learn-more {
        font-size: 1.5rem;
      }
    }
  }

}


</style>