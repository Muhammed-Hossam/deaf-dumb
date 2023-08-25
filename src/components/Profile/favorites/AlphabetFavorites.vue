<template>
  <div class="alphabet-favorites border-bottom mb-5">
    <details>
      <summary>Alphabet Favorites</summary>
      <div v-if="favoriteLetters.length === 0" class="not-found py-5 my-3">
        <p class="text-center fs-3 fw-bold text-body-tertiary">
          There is no Alphabet Favorites!
        </p>
      </div>
      <div v-else class="cards">
        <div class="container">
          <div class="row">
          <AlphabetCard
            v-for="favLetter in favoriteLetters"
            :key="favLetter.letter"
            :letter="favLetter.letter"
            :imgSrc="favLetter.signImage"
            @show-content="showContent"
          />
          </div>
        </div>
        <div class="container">
          <AlphabetCardContent
            :show="show"
            :letter="letter"
            :imgSrc="imgSrc"
            @close-content="closeContent"
          />
        </div>
      </div>
    </details>
  </div>
</template>


<script>
import AlphabetCard from "@/components/Alphabet/AlphabetCard.vue";
import AlphabetCardContent from "@/components/Alphabet/AlphabetCardContent.vue";

import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    AlphabetCard,
    AlphabetCardContent,
  },
  data() {
    return {
      favoriteLetters: [],
      isLoading: true,
      show: false,
      letter: "",
      imgSrc: "",
    };
  },
  methods: {
    retrieveFavorites() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          onSnapshot(
            userRef,
            (snapshot) => {
              const userData = snapshot.data();
              if (userData && userData.favorites && userData.favorites.letters) {
                const lettersFavoritesIds = userData.favorites.letters;
                const lettersPromises = lettersFavoritesIds.map(
                  async (letterId) => {
                    const lettersRef = doc(db, "letters", letterId);
                    const letterSnapshot = await getDoc(lettersRef);
                    return letterSnapshot.data();
                  }
                );
                Promise.all(lettersPromises).then((lettersFavorites) => {
                  this.favoriteLetters = lettersFavorites;
                });
              } else {
                console.log("No favorite letters found.");
              }
            },
            (error) => {
              console.error("Error fetching user data:", error);
            }
          );
        }
      });
    },
    showContent(payload) {
      this.show = payload.show;
      this.letter = payload.letter;
      this.imgSrc = payload.imgSrc;
    },
    closeContent(payload) {
      this.show = payload;
    },
  },
  mounted() {
    this.retrieveFavorites();
  },
};
</script>


<style lang="scss" scoped>
.alphabet-favorites {
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
}
</style>