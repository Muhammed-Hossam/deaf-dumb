<template>
  <div class="common-signs-favorites border-bottom mb-5">
    <details>
      <summary>Common Signs Favorites</summary>
      <div v-if="commonSignsFavorites.length === 0" class="not-found py-5 my-3">
        <p class="text-center fs-3 fw-bold text-body-tertiary">
          There is no Common Sign Favorites!
        </p>
      </div>
      <div v-else class="words py-5">
        <div class="row">
          <WordCard
            v-for="sign in commonSignsFavorites"
            :key="sign.word"
            :link="`common-signs/${sign.word}`"
            :preview-img="sign.previewImg"
            :word="sign.word"
          />
        </div>
      </div>
    </details>
  </div>
</template>


<script>
import WordCard from '@/components/common/WordCard.vue';

import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    WordCard
  },
  data() {
    return {
      commonSignsFavorites: []
    }
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
              if (userData && userData.favorites && userData.favorites.commonSigns) {
                const commonSignsFavoritesIds = userData.favorites.commonSigns;
                const commonSignsPromises = commonSignsFavoritesIds.map(
                  async (signId) => {
                    const commonSignsRef = doc(db, "commonSigns", signId);
                    const commonSignsnapshot = await getDoc(commonSignsRef);
                    return commonSignsnapshot.data();
                  }
                );
                Promise.all(commonSignsPromises).then((commonSignsFavorites) => {
                  this.commonSignsFavorites = commonSignsFavorites;
                });
              } else {
                console.log("No favorite commonSigns found.");
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
  mounted() {
    this.retrieveFavorites();
  }
}
</script>


<style lang="scss" scoped>
.common-signs-favorites {
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