<template>
  <SectionContainer title="About Us">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-12 col-md-5">
          <img src="../../assets/about/about-section.png" class="w-100" alt="about us image" />
        </div>
        <div class="col-12 col-md-7">
          <swiper
            :slides-per-view="3"
            :space-between="30"
            effect="coverflow"
            :grabCursor="true"
            :coverflowEffect="{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }"
            :autoplay="{ delay: 5000 }"
            :loop="true"
            :modules="modules"
          >
            <swiper-slide v-for="(member, index) in teamMembers" :key="index">
              <SwiperCardContent
                :imgSrc="member.imgSrc"
                :name="member.name"
                :description="member.description"
                :role="member.role"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </SectionContainer>
</template>

<script>
import SectionContainer from "../SectionContainer.vue";
import SwiperCardContent from "../SwiperCardContent.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Team Members Pictures
import mohamedHawary from "../../assets/about/Mohamed-EL-Hawary.png";
import ahmedKhaled from "../../assets/about/ahmed-khaled.jpg";
import ayaBaker from "../../assets/about/aya-baker.jpeg";
import fatmaElKhzamy from "../../assets/about/fatma-elkhzamy.jpeg";
import mahmoudRadwan from "../../assets/about/mahmoud-radwan.jpeg";
import nouraShrief from "../../assets/about/noura-shrief.jpeg";
import abdrahmanMahmoud from "../../assets/about/abdrahman-mahmoud.jpeg"
import amirKhaled from "../../assets/about/Amir-khaled.jpeg";

// Import Swiper Modules
import { Autoplay, EffectCoverflow } from "swiper";

// swiper styles
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/effect-coverflow";

export default {
  components: {
    SectionContainer,
    SwiperCardContent,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      teamMembers: [
        { imgSrc: mohamedHawary, name: 'Mohamed Hytham', description: '22 years old Ungraduated Student at Faculty of Specific education, Mansoura University', role: 'Team Leader' },
        { imgSrc: ahmedKhaled, name: 'Ahmed Khaled', description: '24 years old Ungraduated Student at Faculty of Specific education, Mansoura University', role: 'Image Editing' },
        { imgSrc: ayaBaker, name: 'Aya Baker', description: '22 years old Ungraduated Student at Faculty of Specific education, Mansoura University', role: 'Frontend Developer' },
        { imgSrc: fatmaElKhzamy, name: 'Fatma Elkhzamy', description: '22 years old Ungraduated Student at Faculty of Specific education, Mansoura University', role: 'Frontend Developer' },
        { imgSrc: mahmoudRadwan, name: 'Mahmoud Radwan', description: '24 years old Ungraduated Student at Faculty of Specific education, Mansoura University', role: 'Content Creator' },
        { imgSrc: nouraShrief, name: 'Noura Shrief', description: '22 years old Ungraduated Student at Faculty of Specific education, Mansoura University', role: 'Database Developer' },
        { imgSrc: abdrahmanMahmoud, name: 'Abdrahman Mahmoud', description: '22 years old Ungraduated Student at Faculty of Specific education, Mansoura University', role: 'Data Collector' },
        { imgSrc: amirKhaled, name: 'Amir Khaled', description: '24 years old Ungraduated Student at Faculty of Specific education, Mansoura University', role: 'Frontend Developer' },

      ]
    }
  },
  setup() {
    return {
      modules: [Autoplay, EffectCoverflow],
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/custom.scss";

.swiper {
  width: 100%;
  height: 30rem;

  .swiper-wrapper {
    align-items: center !important;

    .swiper-slide {
      height: 60%;
      text-align: center;
      font-size: 18px;
      background: #fff;
      box-shadow: $main-shadow;
      border-radius: 5px;

      /* Center slide text vertically */
      display: flex;
      justify-content: center;
      // align-items: center;
    }
  }
}
</style>
