<template>
  <header class="position-fixed top-0 w-100" :class="{ 'shadow-header': isScrolled }">
    <nav class="navbar navbar-expand-lg p-0">
      <div class="container-fluid">
        <!-- Start Logo -->
        <router-link to="/" class="navbar-brand py-0">
          <img src="../../assets/logo.webp" alt="logo" width="65" height="65" />
          <span>Deaf & Dumb</span>
        </router-link>
        <!-- End Logo -->
        <!-- Start Navbar toggler for small screens (mobile, tablet) -->
        <button class="navbar-toggler" @click="toggleNavbar" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <font-awesome-icon class="toggler-icon" :icon="togglerIcon" size="xl" />
        </button>
        
        <!-- End Navbar toggler for small screens (mobile, tablet) -->
        <div class="collapse navbar-collapse justify-content-around" ref="collapseNavbar" id="navbarNav">
          <!-- Start user-greeting-section for small screens (mobile, tablet) -->
          <HeaderGreetingUserSection
            v-if="isLoggedIn"
            class="user-greeting-section-mobile my-3 text-center"
            :userName="userName" 
            :userPhoto="userPhoto" 
            :role="role"
            @logout-user="logoutUser"
          />
          <!-- End user-greeting-section for small screens (mobile, tablet) -->
          <ul class="navbar-nav" role="navigation">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active router-link-active" @click="closeNavbar" to="/">
                Home
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <!-- dropdown for large screens (Desktop) -->
              <a href="#" class="btn dropdown-toggle text-muted d-none d-lg-block" aria-expanded="false">
                Contents
              </a>
              <!-- dropdown for small screens (mobile, tablet) -->
              <a class="btn dropdown-toggle d-lg-none mobile-dropdown-toggle px-0" href="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Contents
              </a>
              <!-- Start Contents Dropdown menu -->
              <ul class="dropdown-menu contents">
                <li>
                  <router-link class="dropdown-item" active-class="router-link-active text-dark" @click="closeNavbar"
                    to="/alphabet">
                    Sign Lang Alphabet
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" active-class="router-link-active text-dark" @click="closeNavbar"
                    to="/common-signs">
                    Common Signs
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" active-class="router-link-active text-dark" @click="closeNavbar"
                    to="/dictionary">
                    Signs Dictionary
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" active-class="router-link-active text-dark" @click="closeNavbar"
                    to="/flash-cards">
                    Flash Cards
                  </router-link>
                </li>
              </ul>
              <!-- End Contents Dropdown menu -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active router-link-active" @click="closeNavbar"
                to="/contact">Contact Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active router-link-active" @click="closeNavbar"
                to="/about">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active router-link-active" @click="closeNavbar"
                to="/privacy">Privacy</router-link>
            </li>
          </ul>
          <!-- Start Authentication Links -->
          <ul v-if="!isLoggedIn" class="navbar-nav auth-links" role="navigation">
            <li class="nav-item">
              <router-link class="nav-link" @click="closeNavbar" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" @click="closeNavbar" to="/login">Login</router-link>
            </li>
          </ul>
          <!-- End Authentication Links -->

          <!-- Start user-greeting-section for large screens (Desktop) -->
          <HeaderGreetingUserSection 
            v-else
            class="user-greeting-section-desktop d-none"
            :userName="userName" 
            :userPhoto="userPhoto" 
            :role="role"
            @logout-user="logoutUser"
          />
          <!-- End user-greeting-section for large screens (Desktop) -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { signOut } from "@firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { mapGetters } from "vuex";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import HeaderGreetingUserSection from "./HeaderGreetingUserSection.vue";

export default {
  components: {
    HeaderGreetingUserSection
  },
  data() {
    return {
      isUserImgClicked: false,
      isNavbarOpened: false,
      scrollYValue: 0,
      isScrolled: false
    };
  },

  computed: {
    ...mapGetters({
      userName: "getUserName",
      isLoggedIn: "getUserLoginState",
      role: "getUserRole",
      userPhoto: "getCroppedUserPhoto",
    }),
    togglerIcon() {
      return this.isNavbarOpened ? faXmark : faBars;
    }
  },

  methods: {
    logoutUser() {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);

      // change isLoggedIn field to false when try to logout
      updateDoc(userRef, {
        isLoggedIn: false
      })
        .then(() => {
          // logout user
          signOut(auth)
            .then(() => {
              this.$store.dispatch("setLoginState", false);
              this.$router.push("/login");
            })
            .catch((error) => {
              console.error(error.message);
            });
        })
        .catch((error) => {
          console.error("Error updating isLoggedIn field:", error);
        });

    },
    clickOnUserImg() {
      this.isUserImgClicked = !this.isUserImgClicked;
    },
    toggleNavbar() {
      this.isNavbarOpened = !this.isNavbarOpened;
    },
    closeNavbar() {
      this.$refs.collapseNavbar.classList.remove('show');
      this.isNavbarOpened = false;
    },
    handleScroll() {
      this.scrollYValue = window.scrollY;
    }
  },

  mounted() {
    this.$store.dispatch("fetchCurrentUserData");
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    scrollYValue(newValue) {
      if (newValue > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/custom.scss";


header {
  background-color: $app-bg;
  z-index: 1111;
  transition: box-shadow 0.3s ease-in-out;


  .navbar {
    .navbar-brand {
      color: $main-color;
      transition: all 0.5s ease-in-out;
      font-weight: 800;

      &:hover {
        color: orange;
      }
    }

    .nav-item {
      text-align: center;
    }

    .dropdown {
      .dropdown-toggle {
        padding-top: 1.3rem;
        padding-bottom: 1.3rem;

        &:focus {
          border: 0;
        }

        &::after {
          transition: all 0.3s ease-in-out;
        }

        &:hover::after {
          rotate: 180deg;
        }
      }

      .dropdown-menu {
        transition: all 0.3s ease-in-out;
        border-radius: 0;
        background-color: $app-bg;
        border: none;

        li {
          text-align: center;
        }
      }
    }

    .nav-link,
    .dropdown-item {
      position: relative;
      padding-top: 1.3rem;
      padding-bottom: 1.3rem;
      // transition: all 0.7s ease-in-out;
      color: rgba(33, 37, 41, 0.75);

      &:hover,
      &.router-link-active {
        background-color: $main-color;
        color: white !important;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .user-greeting-section-mobile {
      display: none !important;
    }

    .user-greeting-section-desktop {
      display: block !important;
    }

    .nav-item:not(:last-of-type) {
      margin-right: 0.3rem !important;
    }


    .dropdown {
      .dropdown-menu {
        li:not(:last-of-type) {
          margin-bottom: 0.3rem;
        }
      }

      &:hover {
        .dropdown-menu.contents {
          display: block;
        }
      }
    }
  }

  a {
    height: 100%;
  }
}

.shadow-header {
  box-shadow: $main-shadow;
}
</style>
