<template>
  <section>
    <div id="homeSlider" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item img-1 active" data-bs-interval="3000">
          <p class="text-light">
            Our mission is to bridge the communication gap for the deaf and dumb
            community by providing a platform for information and resources.
          </p>
        </div>
        <div class="carousel-item img-2" data-bs-interval="3000">
          <p class="text-light">
            Our goal is to empower the deaf and dumb community by providing
            accessible information and resources.
          </p>
        </div>
        <div class="carousel-item img-3" data-bs-interval="3000">
          <p class="text-light">
            Our website aims to provide helpful resources and support for
            individuals who are deaf and/or dumb.
          </p>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#homeSlider"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#homeSlider"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
section {
  background-color: #eee;
  padding: 0.8rem;
.carousel {
  .img-1 {
    background-image: url("../assets/slider/1.jpg");
    background-position: 63% 50%;
  }
  .img-2 {
    background-image: url("../assets/slider/2.jpg");
    background-position: 58% 50%;
  }
  .img-3 {
    background-image: url("../assets/slider/3.jpg");
    background-position: 50% 50%;
  }
  .carousel-item {
    max-width: 100%;
    background-size: cover;
    height: 90vh;
    // background-position: 63% 50%;
    background-repeat: no-repeat;
    position: relative;
    padding: 7rem 0;
    border-radius: 5px;

    p {
      position: absolute;
      // top: 50%;
      left: 50%;
      // transform: translateY(-50%);
      transform: translateX(-50%);
      // font-size: 35px;
      font-size: 1.5rem;
      width: 70%;
      font-weight: 500;
      text-transform: uppercase;
      text-align: center;
      color: #000;
      padding: 1rem;
      border-radius: 5px;
      box-shadow: 0px 2px 4px 6px rgb(0, 0, 0, 0.1);
      background-color: rgba(0, 0, 0, 0.25);
    }

    // @media (min-width: 992px) {
    //   p {
    //     font-size: 2.1rem;
    //   }
    // }
  }
}

.carousel {
  @media (min-width: 992px) {
    .carousel-item {
      padding: 0;
      background-position: center top;
      p {
        font-size: 2.1rem;
        font-weight: 700;
        width: 30%;
        top: 50%;
        left: 5%;
        transform: translateX(0);
        transform: translateY(-50%);
      }
    }
    .img-3 {
      background-position: 50% 70% !important;
    }
  }
}

}
</style>
