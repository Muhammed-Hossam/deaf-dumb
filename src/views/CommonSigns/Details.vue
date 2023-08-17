<template>
  <LoadingSpinner v-if="isLoading" />
  <div>
    <FavoriteButton :isFavorited="isFavorited" @toggle-favorite="toggleFavBtn" />
    <WordDetials :word="word" :description="description" :innerImg="innerImg" />
  </div>
</template>


<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import WordDetials from '@/components/common/WordDetials.vue';
import FavoriteButton from '@/components/common/FavoriteButton.vue';


import { db, auth } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useToast } from 'vue-toastification';

export default {
  name: 'common-sign-details',
  props: ['word'],

  components: {
    WordDetials,
    LoadingSpinner,
    FavoriteButton
},

  data() {
    return {
      innerImg: '',
      description: '',
      isLoading: true,
      isFavorited: false
    };
  },
  computed: {
    toastOptions() {
      return {
        position: "top-right",
        timeout: 4000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      };
    },
  },
  methods: {
    async toggleFavBtn() {
      this.isFavorited = !this.isFavorited;

      // Update user's favorites in firestore
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const favoritesUpdate = {
          [`favorites.commonSigns`]: this.isFavorited
            ? arrayUnion(this.word)
            : arrayRemove(this.word),
        };
        await updateDoc(userRef, favoritesUpdate);
      } else {
        console.log("Login first to use this feature!");
        const toast = useToast();
        toast.warning('Login first to use favorite feature!', this.toastOptions);
        this.isFavorited = false;
      }
    },
    checkIfWordIsFavorite() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          onSnapshot(userRef, (snapshot) => {
            const userData = snapshot.data();
            const commonSignsFavoritesArray = userData.favorites.commonSigns;
            console.log(commonSignsFavoritesArray);
            commonSignsFavoritesArray.forEach((item) => {
              if (item === this.word) {
                this.isFavorited = true;
              }
            });
          });
        }
      });
    },
  },
  watch: {
    word: {
      immediate: true,
      handler(newWord) {
        const signRef = doc(db, 'commonSigns', newWord);
        getDoc(signRef).then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            this.innerImg = data.innerImg;
            this.description = data.description;
            this.isLoading = false;
            this.checkIfWordIsFavorite();
          }else {
            console.log('No such document!')
          }
        })
        .catch((error) => {
          console.log('Error getting document: ', error)
        })
      }
    }
  }
}
</script>