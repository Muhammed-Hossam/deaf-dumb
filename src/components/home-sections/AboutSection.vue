<template>
  <SectionContainer title="About Us">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-5">
          <img
            src="../../assets/about/about-section.png"
            alt="about us image"
            class="w-100"
          />
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
            :autoplay="{'delay': 5000}"
            :loop="true"
            :modules="modules"
          >
            <swiper-slide>
              <SwiperCardContent
                :imgSrc="require('../../assets/about/Mohamed-EL-Hawary.png')"
                name="Mohamed Hytham"
                description="22 years old Ungraduated Student at Faculty of Specific education, Mansoura University"
                role="Team Leader"
              />
            </swiper-slide>
            <swiper-slide>
              <SwiperCardContent
                :imgSrc="require('../../assets/about/ahmed-khaled.jpg')"
                name="Ahmed Khaled"
                description="24 years old Ungraduated Student at Faculty of Specific education, Mansoura University"
                role="Image Editing"
              />
            </swiper-slide>
            <swiper-slide>
              <SwiperCardContent
                :imgSrc="require('../../assets/about/aya-baker.jpeg')"
                name="Aya Baker"
                description="22 years old Ungraduated Student at Faculty of Specific education, Mansoura University"
                role="Frontend Developer"
              />
            </swiper-slide>
            <swiper-slide>
              <SwiperCardContent
                :imgSrc="require('../../assets/about/fatma-elkhzamy.jpeg')"
                name="fatma-Elkhzamy"
                description="22 years old Ungraduated Student at Faculty of Specific education, Mansoura University"
                role="Frontend Developer"
              />
            </swiper-slide>
            <swiper-slide>
              <SwiperCardContent
                :imgSrc="require('../../assets/about/mahmoud-radwan.jpeg')"
                name="Mahmoud Radwan"
                description="24 years old Ungraduated Student at Faculty of Specific education, Mansoura University"
                role=" Content Creator"
              />
            </swiper-slide>
            <swiper-slide>
              <SwiperCardContent
                :imgSrc="require('../../assets/about/noura-shrief.jpeg')"
                name="Noura Shriaf"
                description="22 years old Ungraduated Student at Faculty of Specific education, Mansoura University"
                role="Database Developer"
              />
            </swiper-slide>
            <swiper-slide><SwiperCardContent
                :imgSrc="require('../../assets/about/abdrahman-mahmoud.jpeg')"
                name="Abdrahman Mahmoud"
                description="22 years old Ungraduated Student at Faculty of Specific education, Mansoura University"
                role="Data Collector"
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
  setup() {
    return {
      modules: [Autoplay, EffectCoverflow],
    };
  },
};
</script>

<style lang="scss">
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
      box-shadow: 0 1px 5px 5px rgb(0 0 0 / 10%);
      border-radius: 5px;

      /* Center slide text vertically */
      display: flex;
      justify-content: center;
      // align-items: center;
    }
  }
}
</style>
