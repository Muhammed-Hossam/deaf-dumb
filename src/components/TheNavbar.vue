<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
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
        class="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul class="navbar-nav" role="navigation">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/content">Content</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/privacy">Privacy</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      link.addEventListener("click", () => {
        const activeLink = document.querySelector(".nav-link.active");
        activeLink.classList.remove("active");
        link.classList.add("active");
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0;
  .navbar-brand {
    color: #02b1b4;
    transition: all 0.5s ease-in-out;
    padding-top: 0;
    padding-bottom: 0;
    font-weight: 800;

    &:hover {
      color: orange;
    }
  }

  .nav-link {
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
  @media (min-width: 992px) {
    .nav-link {
      &.router-link-exact-active {
        &::after {
          width: 85%;
        }
      }
      &:hover::after {
      width: 85%;
    }
    }
  }
}
</style>
