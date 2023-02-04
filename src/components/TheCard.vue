<template>
  <div class="card mb-3 px-0 me-4" style="max-width: 400px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="cardImg" class="img-fluid rounded-start h-100" :alt="alt">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-center">{{ cardTitle }}</h5>
        <p class="card-text">{{ cardText }}</p>
        <router-link class="text-decoration-none" :to="link">learn more <font-awesome-icon icon="fa-solid fa-arrow-right-long" /></router-link>
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
.card {
  height: fit-content;

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
}
</style>