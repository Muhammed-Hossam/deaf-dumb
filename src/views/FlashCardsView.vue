<template>
  <div>
    <div class="banner"></div>
    <div v-for="(card, index) in flashCards" :key="index" class="flash-cards">
      <div class="container">
        <card-container>
          <div class="question-card">
            <QuestionFlipCard :card="card" :rotate="activeImg[index].rotate" />
          </div>
          <div class="answer-cards d-flex justify-content-around mt-5">
            <AnswerCard
              v-for="(sign, signIndex) in [
                card.firstSign,
                card.secondSign,
                card.thirdSign,
                card.fourthSign,
              ]"
              :key="signIndex"
              :imageUrl="sign.sign"
              :isCorrect="correctAnswer"
              :isActive="sign.sign === activeImg[index]?.sign"
              @click="activeImg[index] = sign"
            />
          </div>
          <div class="btn-wrapper text-end mt-3">
            <button
              class="btn text-success border-0"
              :disabled="!this.activeImg[index]?.sign"
              @click="checkAnswer(index)"
            >
              <font-awesome-icon class="fs-2" icon="fa-solid fa-circle-check" />
            </button>
          </div>
        </card-container>
      </div>
    </div>
  </div>
</template>

<script>
import CardContainer from "@/components/CardContainer.vue";
import QuestionFlipCard from "@/components/QuestionFlipCard.vue";
import AnswerCard from "@/components/AnswerCard.vue";

import { db } from "@/firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

export default {
  components: {
    CardContainer,
    QuestionFlipCard,
    AnswerCard,
  },
  data() {
    return {
      flashCards: [],
      activeImg: [],
      correctAnswer: null,
      rotate: false
    };
  },
  computed: {
    
  },
  methods: {
    async retrievedData() {
      const flashCardsRef = collection(db, "flashCards");
      const querySnapshot = await getDocs(flashCardsRef);
      const flashCardsData = [];
      querySnapshot.forEach((doc) => {
        flashCardsData.push(doc.data());
        console.log(doc.data())
      });
      this.flashCards = flashCardsData;
      this.activeImg = flashCardsData.map(() => ({ sign: null, rotate: false })); // Initialize activeImg array
    },
    checkAnswer(index) {
      this.correctAnswer = this.activeImg[index].isCorrect;
      console.log(this.correctAnswer)
      if (!this.correctAnswer) {
        this.activeImg[index].rotate = true;
      }
    },
  },
  async created() {
    await this.retrievedData();
    // this.activeImg = {}
  },
  watch: {
    activeImg(newValue) {
      console.log('activeImg: ', newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  background-image: url("../assets/contents/flash-cards-banner.jpg");
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center -10rem;
}

.btn:hover {
  svg {
    transition: all 0.3s ease-in-out;
    color: rgb(24 183 106) !important;
  }
}
</style>
