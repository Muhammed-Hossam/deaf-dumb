<template>
    <section>
        <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <!-- <img src="../assets/slider/1.jpg" height="" class="d-block w-100" alt="..."> -->
      <div class="img1"></div>
    </div>
    <div class="carousel-item">
      <!-- <img src="../assets/slider/2.jpg" class="d-block w-100" alt="..."> -->
      <div class="img2"></div>
    </div>
    <div class="carousel-item">
      <!-- <img src="../assets/slider/3.jpg" class="d-block w-100" alt="..."> -->
      <div class="img3"></div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </section>
</template>


<script>
export default {
    components: {
    },
    data() {
        return {};
    },
}
</script>


<style lang="scss" scoped>
.carousel {
    .carousel-item {
        .img1 {
            background-image: url('../assets/slider/1.jpg');
            background-size: cover;
            height: 100%;
            background-position: center;
        }
    }
}
</style>