<template>
  <div>
    <TheHeader />
    <main>
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { mapActions, mapGetters } from "vuex";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, updateDoc } from "@firebase/firestore";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(['setLoginState']),
    setMarginTopToPageContentBasedOnHeaderHeight() {
      const header = document.querySelector('header');
      const main = document.querySelector('main');
      const headerHeight = header.offsetHeight;
      main.style.marginTop = `${headerHeight}px`;
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'getUserLoginState'
    })
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is Signed in
        updateDoc(doc(db, 'users', user.uid), {
          isLoggedIn: this.isLoggedIn
        })

        if (user.photoURL) {
          this.$store.dispatch('setUserPhoto', user.photoURL);
        }else {
          this.$store.dispatch('setUserPhoto', '');
        }

      } else {
        // User is signed out
        console.log("User is signed out");
        this.setLoginState(false);
      }
    });

    this.setMarginTopToPageContentBasedOnHeaderHeight();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
@import "@/scss/custom.scss";

#app {
  font-family: "Manrope", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.background {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
}

.swiper-button-prev,
.swiper-button-next {
  width: 3rem !important;
  top: 93% !important;
  border-radius: 50% !important;
  transition: all 0.3s ease-in-out !important;

  &::after {
    font-size: 2rem !important;
  }

  &:hover {
    background-color: rgb(238, 238, 238) !important;
  }

  &:active {
    border: 2px solid #007aff !important;
  }

}

.mt-8 {
  margin-top: 8rem;
}
.mt-6 {
  margin-top: 5.5rem;
}

</style>
