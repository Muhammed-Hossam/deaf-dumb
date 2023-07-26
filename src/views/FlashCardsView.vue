<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="mt-8">
    <div class="banner"></div>
    <div class="questions-details">
      <h2 class="text-center h1 mb-5">Number of Questions: {{ flashCards.length }}</h2>
      <div class="score d-flex justify-content-around mb-5">
        <h4 class="correct-answer h2 p-3 fw-bold rounded">Correct Answers: {{ correctAnswersCount }}</h4>
        <h4 class="wrong-answer h2 p-3 fw-bold rounded">Wrong Answers: {{ wrongAnswersCount }}</h4>
      </div>
    </div>
    <div class="container">
      <card-container style="padding: 0 !important;">
        <swiper
        :pagination="{
          type: 'progressbar',
        }"
        :space-between="50"
        :navigation="true"
        :modules="modules"
        class="mySwiper h-100"
        >
          <swiper-slide v-for="(card, index) in flashCards" :key="index" class="position-relative p-5">
            <!-- <div class="container"> -->
              
              <div>
                <span
                  v-if="card.correctAnswer"
                  class="correct-icon position-absolute"
                >
                  <font-awesome-icon icon="fa-solid fa-check-double" />
                </span>
                <span
                  v-if="card.correctAnswer === false"
                  class="wrong-icon position-absolute"
                >
                  <font-awesome-icon icon="fa-solid fa-xmark" />
                </span>
                <div class="question-card">
                  <QuestionFlipCard :card="card" :rotate="card.rotate" />
                </div>
                <div class="container">
                  <div class="answer-cards row mt-5 justify-content-between">
                    <AnswerCard
                      v-for="(sign, signIndex) in card.signs"
                      :key="signIndex"
                      :imageUrl="sign.sign"
                      :isCorrect="card.correctAnswer"
                      :isActive="card.activeImg?.sign === sign.sign"
                      :isAnswerd="card.isAnswerd"
                      @click="activateAnswerCard(card, sign)"
                    />
                  </div>
                </div>
                <div class="btn-wrapper text-end mt-3">
                  <button
                    class="btn text-success border-0"
                    :disabled="!card.btnIsActive"
                    @click="checkAnswer(card)"
                  >
                    <font-awesome-icon class="fs-2" icon="fa-solid fa-circle-check" />
                  </button>
                </div>
              </div>
            <!-- </div> -->
          </swiper-slide>
        </swiper>
      </card-container>
    </div>
  </div>
</template>

<script>
import CardContainer from "@/components/CardContainer.vue";
import QuestionFlipCard from "@/components/QuestionFlipCard.vue";
import AnswerCard from "@/components/AnswerCard.vue";

import { db } from "@/firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

export default {
  components: {
    CardContainer,
    QuestionFlipCard,
    AnswerCard,
    LoadingSpinner,
    Swiper,
    SwiperSlide
},
  data() {
    return {
      flashCards: [],
      isLoading: true,
      correctAnswersCount: 0,
      wrongAnswersCount: 0,
      modules: [Pagination, Navigation],
    };
  },
  methods: {
    async retrievedData() {
      const flashCardsRef = collection(db, "flashCards");
      const querySnapshot = await getDocs(flashCardsRef);
      const flashCardsData = [];
      querySnapshot.forEach((doc) => {
        flashCardsData.push({
          ...doc.data(),
          activeImg: null,
          correctAnswer: null,
          rotate: false,
          btnIsActive: false,
          isAnswerd: false,
        });
      });
      this.flashCards = flashCardsData;
      this.isLoading = false;
    },
    activateAnswerCard(card, sign) {
      card.activeImg = sign;
      card.btnIsActive = true;
    },
    checkAnswer(card) {
      console.log("check-card: ", card);
      if (card.activeImg.isCorrect) {
        card.correctAnswer = true;
        card.rotate = false;
        this.correctAnswersCount++;
      } else {
        card.correctAnswer = false;
        card.rotate = true;
        this.wrongAnswersCount++;
      }
      card.btnIsActive = false;
      card.isAnswerd = true;
    },
  },
  async created() {
    await this.retrievedData();
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

$correct-color: rgb(10, 223, 10);
$wrong-color: rgb(211, 16, 16);

.banner {
  background-image: url("../assets/contents/flash-cards-banner.png");
  background-size: cover;
  height: 500px;
  background-position: center -11rem;
  background-repeat: no-repeat;
}

.correct-answer {
  background-color: $correct-color;
  color: #fff;
}
.wrong-answer {
  background-color: $wrong-color;
  color: #fff;
}

.correct-answer,
.wrong-answer {
  box-shadow: 0px 2px 5px 5px rgba(0, 0, 0, 0.1);
}

.correct-icon {
  font-size: 8rem;
  color: $correct-color;
}

.wrong-icon {
  font-size: 8rem;
  color: $wrong-color;
}

.correct-icon,
.wrong-icon {
  left: 6rem;
}

@include media-breakpoint-down(lg) {
  .banner {
    background-position: center -7.5rem;
  }

  .score {
    gap: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    h4 {
      font-size: 0.9rem;
      padding: 0.5rem;
    }
  }
}
</style>
