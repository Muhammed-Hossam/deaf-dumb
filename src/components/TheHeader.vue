<template>
  <header class="position-fixed top-0 w-100 bg-white">
    <!-- Start greeting-user for small screens (mobile, tablet) -->
    <div  v-if="isLoggedIn" class="greeting-user greeting-user-mobile dropdown text-center py-3 bg-light" style="position: unset">
      <span class="userName fw-bold me-2">
        <span class="text-dark">Hi,</span>{{ userName }}
      </span>
      <button  class="user-img-btn rounded-circle border d-inline-block fs-3" type="button" @click="clickOnUserImg">
        <font-awesome-icon v-if="!userPhoto" icon="fa-solid fa-user" />
        <img v-else :src="userPhoto" class="user-photo rounded-circle" alt="user-pic"  referrerpolicy="no-referrer"/>
      </button>
      <ul class="dropdown-menu text-center end-0" :class="{ show: isUserImgClicked }" style="position: unset !important">
        <li>
          <button class="btn p-3 w-100 rounded-0" @click="logoutUser">
            Logout
          </button>
        </li>
        <li v-if="role === 'admin'">
          <router-link class="dropdown-item" to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </div>
    <!-- End greeting-user for small screens (mobile, tablet) -->
    
    <nav class="navbar navbar-expand-lg p-0">
      <div class="container-fluid">
        <!-- Start Logo -->
        <router-link to="/" class="navbar-brand py-0">
          <img src="../assets/logo.png" alt="logo" width="70" height="70" />
          <span>Deaf & Dumb</span>
        </router-link>
        <!-- End Logo -->
        <!-- Start Navbar toggler for small screens (mobile, tablet) -->
        <button class="navbar-toggler" @click="toggleNavbar" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <font-awesome-icon class="toggler-icon" :icon="togglerIcon" size="xl" />
        </button>
        <!-- End Navbar toggler for small screens (mobile, tablet) -->
        <div class="collapse navbar-collapse justify-content-around" ref="collapseNavbar" id="navbarNav">
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
              <a class="btn dropdown-toggle d-lg-none mobile-dropdown-toggle px-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Contents
              </a>
              <!-- Start Contents Dropdown menu -->
              <ul class="dropdown-menu contents">
                <li>
                  <router-link class="dropdown-item" active-class="router-link-active text-dark" @click="closeNavbar" to="/alphabet">
                    Sign Lang Alphabet
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" active-class="router-link-active text-dark" @click="closeNavbar" to="/common-signs">
                    Common Signs
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" active-class="router-link-active text-dark" @click="closeNavbar" to="/dictionary">
                    Signs Dictionary
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" active-class="router-link-active text-dark" @click="closeNavbar" to="/flash-cards">
                    Flash Cards
                  </router-link>
                </li>
              </ul>
              <!-- End Contents Dropdown menu -->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active router-link-active" @click="closeNavbar" to="/contact">Contact Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active router-link-active" @click="closeNavbar" to="/about">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active router-link-active" @click="closeNavbar" to="/privacy">Privacy</router-link>
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

          <!-- Start greeting-user for large screens (Desktop) -->
          <div v-else class="greeting-user dropdown greeting-user-desktop d-none">
            <span class="userName fw-bold me-2">
              <span class="text-dark">Hi,</span> {{ userName }}
            </span>
            <button class="user-img-btn rounded-circle border d-inline-block fs-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <font-awesome-icon v-if="!userPhoto" icon="fa-solid fa-user" />
              <img v-else :src="userPhoto" class="user-photo rounded-circle" alt="user-pic" referrerpolicy="no-referrer" />
            </button>
            <ul class="dropdown-menu text-center end-0">
              <li>
                <button class="btn p-3 w-100 rounded-0" @click="logoutUser">
                  Logout
                </button>
              </li>
              <li v-if="role === 'admin'">
                <router-link class="dropdown-item" active-class="router-link-active text-dark" to="/dashboard">Dashboard</router-link>
              </li>
            </ul>
          </div>
          <!-- End greeting-user for large screens (Desktop) -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { signOut } from "@firebase/auth";
import { auth } from "@/firebaseConfig";
import { mapGetters } from "vuex";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      isUserImgClicked: false,
      isNavbarOpened: false
    };
  },

  computed: {
    ...mapGetters({
      userName: "getUserName",
      isLoggedIn: "getUserLoginState",
      role: "getUserRole",
      userPhoto: "getUserPhoto",
    }),
    togglerIcon() {
      return this.isNavbarOpened ? faXmark : faBars;
    }
  },

  methods: {
    logoutUser() {
      signOut(auth)
        .then(() => {
          this.$store.dispatch("setLoginState", false);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error(error.message);
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
    }
  },

  created() {
    this.$store.dispatch("fetchCurrentUserData");
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";


header {
  z-index: 1111;
  box-shadow: $main-shadow;

  .greeting-user {
    .user-img-btn {
      text-align: center;
      line-height: 50px;
      transition: all 0.3s ease-in-out;
      border: 5px solid #ccc;
      cursor: pointer;
      &:hover,
      &:focus {
        box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.1);
      }
  
      &,
      .user-photo {
        width: 50px;
        height: 50px;
      }
  
      .user-photo {
        transform: translate(-6px, -4px);
        border: 2px solid #ccc;
      }
    }
    .userName {
      color: $main-color;
      vertical-align: super;
    }
  
    .dropdown-menu {
      margin-top: 0.7rem;
      button {
        transition: all 0.3s ease-in-out;
      }
      button:hover {
        background-color: #ddd;
      }
    }
  }
  .navbar {
    .navbar-brand {
      color: $main-color;
      transition: all 0.5s ease-in-out;
      font-weight: 800;
  
      &:hover {
        color: orange;
      }
    }
    .dropdown {
      .dropdown-toggle {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
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
      }
    }
  
    .nav-link,
    .dropdown-item {
      position: relative;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      transition: all 0.7s ease-in-out;
      color: rgba(33, 37, 41, 0.75);
  
      &.router-link-active {
        &::after {
          width: 90%;
        }
      }
  
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        display: block;
        height: 5px;
        width: 0%;
        background: $main-color;
        transition: all 0.3s ease-in-out;
      }
    }
  }
  @include media-breakpoint-up(lg) {
    .greeting-user-mobile {
      display: none !important;
    }
    .greeting-user-desktop {
      display: block !important;
    }
    .nav-link,
    .dropdown-item {
      &.router-link-active {
        &::after {
          width: 85% !important;
        }
      }
      &:hover::after {
        width: 85% !important;
      }
    }
  
    .dropdown {
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

</style>
