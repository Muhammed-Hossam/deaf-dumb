<template>
  <div class="about-us mt-6">
    <div class="banner rounded"></div>
    <div class="container py-5">
      <p class="h1 text-center mb-5 fw-bold text-primary py-1" style="background-color: #cfcfcf8c;">Our Team</p>
      <div class="row justify-content-center mb-5">
        <div class="col-4 w-auto">
          <div class="pic rounded-circle mx-auto">
            <img
              src="../assets/about/Mohamed-EL-Hawary.png"
              class="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            Mohamed El-Hwary
          </h5>
        </div>
      </div>
      <div class="row mt-5 justify-content-around mb-5">
        <div class="col-4 w-auto" v-for="member in teamMembers.firstRow" :key="member.name">
          <div class="pic rounded-circle mx-auto">
            <img
              :src="member.imgSrc"
              class="w-100 h-100 rounded-circle"
              :alt="member.name"
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            {{ member.name }}
          </h5>
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-4 w-auto" v-for="member in teamMembers.secondRow" :key="member.name">
          <div class="pic rounded-circle mx-auto">
            <img
              :src="member.imgSrc"
              class="w-100 h-100 rounded-circle"
              :alt="member.name"
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            {{ member.name }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// Import Team Members Pictures
import ahmedKhaled from "../assets/about/ahmed-khaled.jpg";
import ayaBaker from "../assets/about/aya-baker.jpeg";
import fatmaElKhzamy from "../assets/about/fatma-elkhzamy.jpeg";
import mahmoudRadwan from "../assets/about/mahmoud-radwan.jpeg";
import nouraShrief from "../assets/about/noura-shrief.jpeg";
import abdrahmanMahmoud from "../assets/about/abdrahman-mahmoud.jpeg"
import amirKhaled from "../assets/about/Amir-khaled.jpeg";

export default {
  data() {
    return {
      teamMembers: {
        firstRow: [
          { imgSrc: ayaBaker , name: 'Aya Baker' },
          { imgSrc: fatmaElKhzamy, name: 'Fatma Elkhzamy' },
          { imgSrc: nouraShrief, name: 'Noura Shrief' },
        ],
        secondRow: [
          { imgSrc: abdrahmanMahmoud, name: 'Abdrahman Mahmoud' },
          { imgSrc: ahmedKhaled, name: 'Ahmed Khaled' },
          { imgSrc: mahmoudRadwan, name: 'Mahmoud Radwan' },
          { imgSrc: amirKhaled, name: 'Amir Khaled' },
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

.banner {
  background-image: url("../assets/about/team-banner-bg.jpg");
  background-size: cover;
  height: calc(100vh - 100px);
  margin: 0.8rem;
}

.pic {
  width: 150px;
  height: 150px;
  border: 5px solid #ccc;
}

@include media_breakpoint_down(lg) {
  .about-us {
    margin-top: 10.5rem;

    .pic {
      width: 50px;
      height: 50px;
      border: 3px solid #ccc;
    }
    .name {
      font-size: 8px;
    }
  }
}

</style>
