<template>
  <Teleport to="#app">
    <Transition>
      <div
        v-if="show"
        @click="closeContent"
        class="overlay position-fixed top-0 end-0 bottom-0 start-0"
      ></div>
    </Transition>
  </Teleport>
  <Transition>
    <div v-if="show" class="content rounded p-3 position-fixed start-50">
      <FavoriteButton :isFavorited="isFavorited" @toggle-favorite="toggleFavBtn" />
      <img
        :src="imgSrc"
        :alt="`${letter} sign language image`"
        class="w-100 mt-5"
      />
      <div class="close-btn w-100 position-absolute top-0 end-0 rounded-top">
        <span @click="closeContent" class="close-icon">
          <font-awesome-icon icon="fa-regular fa-circle-xmark" class="fs-4" />
        </span>
      </div>
      <div class="letter position-absolute">
        <span class="fw-bold">{{ letter }}</span>
      </div>
    </div>
  </Transition>
</template>

<script>
import FavoriteButton from "../common/FavoriteButton.vue";

import { db, auth } from "@/firebaseConfig";
import {
  doc,
  // getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useToast } from 'vue-toastification';

export default {
  props: ["show", "letter", "imgSrc"],
  emits: ["close-content"],
  components: {
    FavoriteButton,
  },
  data() {
    return {
      isFavorited: false,
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
    closeContent() {
      this.$emit("close-content", false);
    },
    async toggleFavBtn() {
      this.isFavorited = !this.isFavorited;

      // Update user's favorites in firestore
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const favoritesUpdate = {
          [`favorites.letters`]: this.isFavorited
            ? arrayUnion(this.letter)
            : arrayRemove(this.letter),
        };
        await updateDoc(userRef, favoritesUpdate);
      } else {
        const toast = useToast();
        toast.warning(
          "Login first to use favorite feature!",
          this.toastOptions
        );
        this.isFavorited = false;
      }
    },
    checkIfLetterIsFavorite(letter) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.isFavorited = false;
          const userRef = doc(db, "users", user.uid);
          onSnapshot(userRef, (snapshot) => {
            const userData = snapshot.data();
            const lettersFavoriteArray = userData.favorites.letters;
            lettersFavoriteArray.forEach((item) => {
              if (item === letter) {
                this.isFavorited = true;
              }
            });
          });
        }
      });
    },
  },
  watch: {
    letter(newLetter) {
      this.checkIfLetterIsFavorite(newLetter)
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/scss/custom.scss";
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.content {
  width: 60%;
  height: 500px;
  background-color: white;
  box-shadow: 0 1px 5px 2px rgb(0 0 0 / 10%);
  transform: translate(-50%, -50%);
  z-index: 1111;
  top: 55%;

  img {
    height: 420px;
  }
}
.close-btn {
  // cursor: pointer;
  // width: 100%;
  text-align: end;
  padding: 1rem;
  background-color: white;
  box-shadow: 0px 1px 4px 3px rgb(0 0 0 / 10%);

  .close-icon {
    cursor: pointer;

    svg {
      transition: all 0.3s ease-in-out;

      &:hover {
        color: orangered;
      }
    }
  }
}
.letter {
  top: 5%;
  left: 6%;

  span {
    font-size: 9rem;
    color: #bde910;
  }
}

@include media-breakpoint-down(lg) {
  .content {
    width: 90%;
    height: 400px;
    top: 60%;

    img {
      height: 90%;
    }
    .letter {
      top: 12%;
      left: 6%;
      span {
        font-size: 6rem;
      }
    }
  }
}
</style>