<template>
  <header class="position-fixed top-0 w-100">
    <div
      v-if="isLoggedIn"
      class="greeting-user greeting-user-mobile dropdown text-center py-3 bg-light"
      style="position: unset"
    >
      <span class="userName fw-bold me-2"
        ><span class="text-dark">Hi,</span> {{ userName }}</span
      >
      <button
        class="user-img rounded-circle border d-inline-block fs-3"
        type="button"
        @click="clickOnUserImg"
      >
        <font-awesome-icon v-if="!userPhoto" icon="fa-solid fa-user" />
        <img v-else :src="userPhoto" class="user-photo" alt="" />
      </button>
      <ul
        class="dropdown-menu text-center end-0"
        :class="{ show: isUserImgClicked }"
        style="position: unset !important"
      >
        <li>
          <button class="btn p-3 w-100 rounded-0" @click="logoutUser">
            Logout
          </button>
        </li>
        <li v-if="role === 'admin'">
          <router-link class="dropdown-item" to="/dashboard"
            >Dashboard</router-link
          >
        </li>
      </ul>
    </div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand py-0">
          <img src="../assets/logo.png" alt="logo" width="70" height="70" />
          <span>Deaf & Dumb</span>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-around"
          id="navbarNav"
        >
          <ul class="navbar-nav" role="navigation">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <!-- dropdown -->
              <a
                href="#"
                class="btn dropdown-toggle text-muted d-none d-lg-block"
                aria-expanded="false"
              >
                contents
              </a>
              <!-- dropdown toggle for mobile -->
              <a
                class="btn dropdown-toggle d-lg-none mobile-dropdown-toggle px-0"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu contents">
                <li>
                  <router-link class="dropdown-item text-muted" to="/alphabet"
                    >Sign Lang Alphabet</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-muted"
                    to="/common-signs"
                    >Common Signs</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item text-muted" to="/dictionary"
                    >Signs Dictionary</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item text-muted"
                    to="/flash-cards"
                    >Flash Cards</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact"
                >Contact Us</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/privacy">Privacy</router-link>
            </li>
          </ul>
          <ul
            v-if="!isLoggedIn"
            class="navbar-nav auth-links"
            role="navigation"
          >
            <li class="nav-item">
              <router-link class="nav-link" to="/register"
                >Register</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </ul>
          <div
            v-else
            class="greeting-user dropdown greeting-user-desktop d-none"
          >
            <span class="userName fw-bold me-2"
              ><span class="text-dark">Hi,</span> {{ userName }}</span
            >
            <button
              class="user-img rounded-circle border d-inline-block fs-3"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon v-if="!userPhoto" icon="fa-solid fa-user" />
              <img v-else :src="userPhoto" class="user-photo" alt="" />
            </button>
            <ul class="dropdown-menu text-center end-0">
              <li>
                <button class="btn p-3 w-100 rounded-0" @click="logoutUser">
                  Logout
                </button>
              </li>
              <li v-if="role === 'admin'">
                <router-link class="dropdown-item" to="/dashboard"
                  >Dashboard</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { signOut } from "@firebase/auth";
import { auth } from "@/firebaseConfig";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isUserImgClicked: false,
    };
  },

  computed: {
    ...mapGetters({
      userName: "getUserName",
      isLoggedIn: "getUserLoginState",
      role: "getUserRole",
      userPhoto: "getUserPhoto",
    }),
  },

  methods: {
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log(auth);
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
    /*
      loop through navbar links and when click on any link of them add "active" class to clicked link 
      and remove it from others.
    */
    addActiveClassWhenLinkClicked(
      links,
      linkSelector,
      removedClass,
      addedClass
    ) {
      links.forEach((link) => {
        link.addEventListener("click", () => {
          const activeLink = document.querySelector(linkSelector);
          activeLink ? activeLink.classList.remove(removedClass) : null;
          link.classList.add(addedClass);
        });
      });
    },
  },

  created() {
    this.$store.dispatch("fetchCurrentUserData");
  },

  mounted() {
    const navLinks = document.querySelectorAll(".nav-link");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    console.log("user Photo: ", this.userPhoto);

    console.log(this.email);
    this.addActiveClassWhenLinkClicked(
      navLinks,
      ".nav-link.active",
      "active",
      "active"
    );
    this.addActiveClassWhenLinkClicked(
      dropdownItems,
      ".dropdown-item.router-link-exact-active",
      "text-muted",
      "text-dark"
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

header {
  z-index: 1111;
  box-shadow: 0px 1px 5px 5px rgba(0, 0, 0, 0.1);
}

.greeting-user {
  .user-img {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    transition: all 0.3s ease-in-out;
    border: 5px solid #ccc;
    cursor: pointer;
    &:hover,
    &:focus {
      box-shadow: 0 1px 3px 5px rgb(0 0 0 / 10%);
    }

    .user-photo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      transform: translate(-6px, -4px);
      border: 2px solid #ccc;
    }
  }
  .userName {
    color: #02b1b4;
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
    color: #02b1b4;
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

  .dropdown-item:hover,
  .dropdown-item:focus {
    background: #fff;
    color: #000;
  }

  .nav-link,
  .dropdown-item {
    position: relative;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    transition: all 0.7s ease-in-out;

    &.router-link-exact-active {
      &::after {
        width: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      display: block;
      height: 5px;
      width: 0%;
      background: #02b1b4;
      transition: all 0.3s ease-in-out;
    }

    // &:hover::after {
    //   width: 85%;
    // }
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
    &.router-link-exact-active {
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
</style>
