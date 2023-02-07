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
              <TheCard
                class="col-12 col-lg-6"
                :cardImg="require('../../assets/contents/s-1.jpg')"
                alt="F alphabet image"
                cardTitle="Learn SL Alphabet"
                cardText="Teach the chlidren the Sign Language Alphabet by interactive cards and images."
                link="/alphabet"
              />
              <TheCard
                class="col-12 col-lg-6"
                :cardImg="require('../../assets/contents/s-2.jpg')"
                alt="Most common Signs image"
                cardTitle="Most Common Signs"
                cardText="Learn most common signs to make your level up by knowing the most common signs."
                link="/common-signs"
              />
              </div>
              <div class="row flex-lg-nowrap column-gap-3">

                <TheCard
                  class="col-12 col-lg-6"
                  :cardImg="require('../../assets/contents/s-3.jpg')"
                  alt="Signs dictionary image"
                  cardTitle="Signs Dictionary"
                  cardText="Teach the chlidren the Sign Language Alphabet by interactive cards and images."
                  link="/dictionary"
                />
                <TheCard
                  class="col-12 col-lg-6"
                  :cardImg="require('../../assets/contents/s-4.jpg')"
                  alt="Flash Cards image"
                  cardTitle="Flash Cards"
                  cardText="Test your memorization of signs by using incredible flash cards way."
                  link="/flash-cards"
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
import TheCard from "../TheCard.vue";

export default {
  components: {
    sectionContainer,
    TheCard,
  },
};
</script>

<style lang="scss" scoped>
video {
  border-radius: 5px;
  width: 100%;
}
</style>
