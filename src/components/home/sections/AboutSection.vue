<template>
  <SectionContainer title="About Us">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-12 col-md-5">
          <img src="../../../assets/about/about-section.webp" class="w-100" alt="about us image" />
        </div>
        <div class="team-members col-12 col-md-7">
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
import user1 from "../../../assets/about/user1.webp";
import user2 from "../../../assets/about/user2.webp";
import user3 from "../../../assets/about/user3.webp";
import user4 from "../../../assets/about/user4.webp";
import user5 from "../../../assets/about/user5.jpg";
import user6 from "../../../assets/about/user6.webp";


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
        { imgSrc: user1, name: 'Ahmed Hassan', description: 'This website changed my life; now I can communicate with ease.', role: 'Sign Language Interpreter' },
        { imgSrc: user2, name: 'Khalid Al-Mansour', description: 'I\'m grateful for this platform; it empowers the deaf-dumb community.', role: 'Deaf Advocacy Specialist' },
        { imgSrc: user3, name: 'Omar Farouk', description: 'Finally, a website that understands our needs and supports us!', role: 'Deaf Culture Educator' },
        { imgSrc: user4, name: 'Karim Nasser', description: 'Using this site made me more confident in expressing myself.', role: 'Speech Therapist' },
        { imgSrc: user5, name: 'Rami Ibrahim', description: 'I never thought technology could be so inclusive; thank you for this website!', role: 'Assistive Technology Consultant' },
        { imgSrc: user6, name: 'Amin Khalil', description: 'The tools provided here helped me overcome communication barriers.', role: 'Communication Skills Coach' },
      ],
      modules: [Autoplay, EffectCoverflow],
    }
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
    }
  }
}
</style>
