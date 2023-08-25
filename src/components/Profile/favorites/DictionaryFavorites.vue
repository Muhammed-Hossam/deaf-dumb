<template>
  <div class="dictionary-favorites border-bottom mb-5">
    <LoadingSpinner v-if="isLoading" />
    <details>
      <summary>Dictionary Favorites</summary>
      <div
        v-for="key in sortedKeys"
        :key="key"
        class="dictionary-alphabet my-5 ms-5"
      >
        <details>
          <summary>Words That Starts With {{ key }}</summary>
          <div class="words">
            <div class="row my-5">
              <div v-if="Object.keys(dictionaryFavorites[key]).length === 0" class="not-found py-5">
                <p class="text-center fs-3 fw-bold text-body-tertiary">
                  There is no Favorite Dictionary Words Starts with {{ key }}!
                </p>
              </div>
              <WordCard
                v-else
                v-for="sign of dictionaryFavorites[key]"
                :key="sign.word"
                :link="`dictionary/${key}/details?word=${sign.word}`"
                :preview-img="sign.previewImg"
                :word="sign.word"
              />
            </div>
          </div>
        </details>
      </div>
    </details>
  </div>
</template>


<script>
import WordCard from "@/components/common/WordCard.vue";
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';


import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    WordCard,
    LoadingSpinner
  },
  data() {
    return {
      dictionaryFavorites: {},
      isLoading: true
    };
  },
  computed: {
    sortedKeys() {
      return Object.keys(this.dictionaryFavorites).sort();
    },
  },
  methods: {
    retrieveFavorites() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          onSnapshot(
            userRef,
            async (snapshot) => {
              const userData = snapshot.data();
              if ( userData && userData.favorites && userData.favorites.dictionary) {
                const dictionaryFavorites = userData.favorites.dictionary;
                const updatedDictionaryFavorites = {};

                // Initialize the object with empty sub-objects for each alphabet key
                Object.keys(dictionaryFavorites).forEach((alphabetKey) => {
                  updatedDictionaryFavorites[alphabetKey] = {};
                });

                for (const alphabetKey of Object.keys(dictionaryFavorites)) {
                  const dictionaryRef = doc(db, "dictionary", alphabetKey);
                  const dictionarySnapshot = await getDoc(dictionaryRef);
                  const dictionaryData = dictionarySnapshot.data().words;

                  for (const wordId of dictionaryFavorites[alphabetKey]) {
                    const matchingWordObj = dictionaryData.find(
                      (wordObj) => wordObj.word === wordId
                    );
                    if (matchingWordObj) {
                      updatedDictionaryFavorites[alphabetKey][wordId] = matchingWordObj;
                    }
                  }
                }

                // Update state once after the loop
                this.dictionaryFavorites = updatedDictionaryFavorites;
              } else {
                console.log("No favorite dictionary found.");
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
  },
  watch: {
    dictionaryFavorites: {
      handler(newDictionaryFavorites) {
        this.dictionaryFavorites = newDictionaryFavorites;
        if (Object.keys(this.dictionaryFavorites).length > 0) {
          this.isLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>


<style lang="scss" scoped>
.dictionary-favorites {
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