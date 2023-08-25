<template>
  <div class="flash-cards-favorites border-bottom mb-5">
    <details>
      <summary>Flash Cards Favorites</summary>
      <div v-if="flashCardsFavorites.length === 0" class="not-found py-5 my-3">
        <p class="text-center fs-3 fw-bold text-body-tertiary">
          There is no Alphabet Favorites!
        </p>
      </div>
      <div v-else class="flash-cards-slider">
        <div class="questions-details">
          <h2 class="text-center h1 mb-5">Number of Questions: {{ flashCardsFavorites.length }}</h2>
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
              <swiper-slide v-for="(card, index) in flashCardsFavorites" :key="index" class="position-relative p-5">
                  <FavoriteButton :isFavorited="card.isFavorited" @toggle-favorite="unFavoriteCard(card)" />
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
              </swiper-slide>
            </swiper>
          </card-container>
        </div>
      </div>
    </details>
  </div>
</template>


<script>
import CardContainer from "@/components/common/CardContainer.vue";
import QuestionFlipCard from "@/components/FlashCards/QuestionFlipCard.vue";
import AnswerCard from "@/components/FlashCards/AnswerCard.vue";
import FavoriteButton from '@/components/common/FavoriteButton.vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

import { auth, db } from "@/firebaseConfig";
import { arrayRemove, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    CardContainer,
    QuestionFlipCard,
    AnswerCard,
    FavoriteButton,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      flashCardsFavorites: [],
      favoritesRetrieved: false,
      correctAnswersCount: 0,
      wrongAnswersCount: 0,
      modules: [Pagination, Navigation],
    }
  },
  methods: {
    activateAnswerCard(card, sign) {
      card.activeImg = sign;
      card.btnIsActive = true;
    },
    checkAnswer(card) {
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
    async unFavoriteCard(removedCard) {
      removedCard.isFavorited = false;

      // Update user's favorites in firestore
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const favoritesUpdate = {
          [`favorites.flashCards`]: arrayRemove(removedCard.word),
        };
        await updateDoc(userRef, favoritesUpdate);

        // Remove Card from flashCardsFavorites array
        const index = this.flashCardsFavorites.findIndex(
          card => card.word === removedCard.word
        );
        if (index !== -1) {
          this.flashCardsFavorites.splice(index, 1);
        }
      }

    },
    retrieveFavorites() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          onSnapshot(
            userRef,
            (snapshot) => {
              const userData = snapshot.data();
              if (userData && userData.favorites && userData.favorites.flashCards) {
                const flashCardsFavoritesIds = userData.favorites.flashCards;
                const flashCardsPromises = flashCardsFavoritesIds.map(
                  async (cardId) => {
                    const flashCardsRef = doc(db, "flashCards", cardId);
                    const flashCardsnapshot = await getDoc(flashCardsRef);
                    return flashCardsnapshot.data();
                  }
                );
                Promise.all(flashCardsPromises).then((flashCardsFavorites) => {
                  flashCardsFavorites.forEach(favoriteCard => {
                    const isDuplicate = this.flashCardsFavorites.some(card => card.word === favoriteCard.word)
                    if (!isDuplicate) {
                      this.flashCardsFavorites.push({
                        ...favoriteCard,
                        activeImg: null,
                        correctAnswer: null,
                        rotate: false,
                        btnIsActive: false,
                        isAnswerd: false,
                        isFavorited: true,
                      })
                    }
                  })
                });
              } else {
                console.log("No favorite flashCards found.");
              }
            },
            (error) => {
              console.error("Error fetching user data:", error);
            }
          );
        }
      });
    },
  },
  created() {
      this.retrieveFavorites();
  }
}
</script>



<style lang="scss" scoped>
@import "../../../scss/custom.scss";
$correct-color: rgb(10, 223, 10);
$wrong-color: rgb(211, 16, 16);

.flash-cards-favorites {
  details {
    summary {
      font-size: 1.5rem;
      font-weight: bold;
      color: orangered;
      user-select: none;
    }
    .not-found {
      background-color: #eee;
    }
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
}
</style>