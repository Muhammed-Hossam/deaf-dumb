<template>
  <section-container title="Content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-4">
          <video class="h-100" autoplay loop muted>
            <source src="../../assets/contents/home-video-design-1.mp4" />
          </video>
        </div>
        <div class="col-12 col-lg-8 mt-3">
          <div class="container-fluid">
            <div class="row flex-lg-nowrap column-gap-3">
              <ContentCard
                v-for="(card, index) in firstRow"
                :key="index"
                class="col-12 col-lg-6"
                :cardImg="card.imgPath"
                :alt="card.alt"
                :cardTitle="card.title"
                :cardText="card.text"
                :link="card.link"
              />
            </div>
            <div class="row flex-lg-nowrap column-gap-3">
              <ContentCard
                v-for="(card, index) in secondRow"
                :key="index"
                class="col-12 col-lg-6"
                :cardImg="card.imgPath"
                :alt="card.alt"
                :cardTitle="card.title"
                :cardText="card.text"
                :link="card.link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section-container>
</template>

<script>
import sectionContainer from "../SectionContainer.vue";
import ContentCard from "../ContentCard.vue";
import firstCardImg from '../../assets/contents/s-1.jpg';
import secondCardImg from '../../assets/contents/s-2.jpg';
import thirdCardImg from '../../assets/contents/s-3.jpg';
import fourthCardImg from '../../assets/contents/s-4.jpg';

export default {
  components: {
    sectionContainer,
    ContentCard,
  },
  data() {
    return {
      firstRow: [
        {
          imgPath: firstCardImg,
          alt: "F alphabet image",
          title: "Learn SL Alphabets",
          text: "Teach the chlidren the Sign Language Alphabet by interactive cards and images.",
          link: "/alphabet",
        },
        {
          imgPath: secondCardImg,
          alt: "Most common Signs image",
          title: "Most Common Signs",
          text: "Learn most common signs to make your level up by knowing the most common signs.",
          link: "/common-signs",
        },
      ],
      secondRow: [
        {
          imgPath: thirdCardImg,
          alt: "Signs dictionary image",
          title: "Signs Dictionary",
          text: "English Words with corresponding sign language images arranged alphabetically.",
          link: "/dictionary",
        },
        {
          imgPath: fourthCardImg,
          alt: "Flash Cards image",
          title: "Flash Cards",
          text: "Test your memorization of signs by using incredible flash cards interactive way.",
          link: "/flash-cards",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
video {
  border-radius: 5px;
  width: 100%;
}
</style>
