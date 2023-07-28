<template>
  <section>
    <div id="homeSlider" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="8000">
          <div class="slide-container">
            <div class="img img-1"></div>
            <p>
              Our mission is to bridge the communication gap for the deaf and dumb
              community by providing a platform for information and resources.
            </p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="8000">
          <div class="slide-container">
            <div class="img img-2"></div>
            <p>
              Our goal is to empower the deaf and dumb community by providing
              accessible information and resources.
            </p>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="8000">
          <div class="slide-container">
            <div class="img img-3"></div>
            <p>
              Our website aims to provide helpful resources and support for
              individuals who are deaf and/or dumb.
            </p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#homeSlider" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#homeSlider" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>


<style lang="scss" scoped>
@import "@/scss/custom.scss";

section {
  .carousel {
    .carousel-item {
      /* Modify the carousel-item style */
      max-width: 100%;
      height: 88vh;
      position: relative;
      overflow: hidden;

      .slide-container {
        position: relative;
        height: 100%;
        overflow: hidden;
        background-color: #adb5bd;

        .img {
          /* Set image style */
          width: 100%;
          height: 100%;
          background-size: cover !important;
          background-repeat: no-repeat !important;
          background-position: center;
          clip-path: polygon(63% 0, 100% 0, 100% 30%, 100% 70%, 100% 100%, 30% 100%, 30% 100%, 43% 59%);
        }

        .img-1 {
          background-image: url('../assets/slider/1-mobile.jpg');
        }

        .img-2 {
          background-image: url('../assets/slider/2-mobile.jpg');
        }

        .img-3 {
          background-image: url('../assets/slider/3-mobile.jpg');
        }

        p {
          position: absolute;
          top: 30%;
          left: 8%;
          transform: translate(-8%, -30%);
          font-size: 0.9rem;
          width: 50%;
          font-weight: 500;
          text-transform: uppercase;
          text-align: center;
          color: #fff;
          padding: 1rem;
          border-radius: 5px;
          box-shadow: 0px 1px 5px 3px rgb(0, 0, 0, 0.1);
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  @include media-breakpoint-between(md, lg) {
    .carousel {
      .carousel-item {
        .slide-container {
          .img-1 {
            background-image: url('../assets/slider/1.jpg') !important;
            background-position: 50% 0%;
          }

          .img-2 {
            background-image: url('../assets/slider/2.jpg') !important;
            background-position: 9% 0%;
          }

          .img-3 {
            background-image: url('../assets/slider/3.jpg') !important;
            background-position: center;
          }

          p {
            width: 37%;
            font-size: 1.5rem;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .carousel {
      .carousel-item {
        padding: 0;

        .slide-container {
          .img-1 {
            background-image: url('../assets/slider/1.jpg') !important;
            background-position: 10rem 0%;
          }

          .img-2 {
            background-image: url('../assets/slider/2.jpg') !important;
            background-position: 13rem 0%;
          }

          .img-3 {
            background-image: url('../assets/slider/3.jpg') !important;
            background-position: 18rem 35% !important;
          }

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
      }
    }
  }

}
</style>