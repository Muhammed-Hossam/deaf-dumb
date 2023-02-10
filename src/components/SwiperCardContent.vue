<template>
  <div class="card-container w-100 position-relative">
    <div class="cover-bg"></div>
    <div class="rounded-image rounded-circle position-absolute start-50">
      <img
        :src="imgSrc"
        width="75"
        height="75"
        class="rounded-circle"
        alt="pic"
      />
    </div>
    <div class="name position-absolute w-100 start-50 translate-middle-x">
      <h6 class="fw-bold">{{ name }}</h6>
    </div>
    <p class="description position-absolute text-center px-2">
      {{ description }}
    </p>
    <span
      class="role text-secondary fw-semibold position-absolute fst-italic translate-middle-x"
      >{{ role }}</span
    >
  </div>
</template>

<script>
export default {
  props: ["imgSrc", "name", "description", "role"],
};
</script>

<style lang="scss">
.card-container {
  background-color: #eee;

  .cover-bg {
    height: 40%;
    background-color: #019cf8;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .rounded-image {
    // left: 50%;
    top: 35%;
    transform: translate(-50%, -35%);
    padding: 0.4rem;
    background-color: #fff;

    img {
      border: 4px solid #019cf8;
    }
  }

  .name {
    top: 56%;
    color: #019cf8;

    h6 {
      font-size: 0.6rem;
    }
  }

  .description {
    top: 65%;
    font-size: 0.5rem;
  }

  .role {
    font-size: 0.4rem;
    bottom: 1rem;
  }

  @media (min-width: 992px) {
    h6 {
      font-size: 1rem !important;
      letter-spacing: 1px;
    }

    .description {
      font-size: 0.8rem;
      letter-spacing: 0.8px;
    }

    .role {
      font-size: 0.75rem;
      letter-spacing: 1.5px;
    }
  }
}
</style>
