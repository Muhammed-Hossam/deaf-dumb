<template>
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
        class="collapse navbar-collapse justify-content-center"
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
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item text-muted" to="/alphabet"
                  >Sign Lang Alphabet</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item text-muted" to="/common-signs"
                  >Common Signs</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item text-muted" to="/dictionary"
                  >Signs Dictionary</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item text-muted" to="/flash-cards"
                  >Flash Cards</router-link
                >
              </li>
            </ul>
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
    const navLinks = document.querySelectorAll(".nav-link");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    /*
      loop through navbar links and when click on any link of them add "active" class to clicked link 
      and remove it from others.
    */
    function addActiveClassWhenLinkClicked(
      links,
      linkSelector,
      removedClass,
      addedClass
    ) {
      links.forEach((link) => {
        link.addEventListener("click", () => {
          const activeLink = document.querySelector(linkSelector);
          activeLink.classList.remove(removedClass);
          link.classList.add(addedClass);
        });
      });
    }

    addActiveClassWhenLinkClicked(
      navLinks,
      ".nav-link.active",
      "active",
      "active"
    );
    addActiveClassWhenLinkClicked(
      dropdownItems,
      ".dropdown-item.router-link-exact-active",
      "text-muted",
      "text-dark"
    );
  },
};
</script>

<style lang="scss" scoped>
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
  @media (min-width: 992px) {
    .nav-link,
    .dropdown-item {
      &.router-link-exact-active {
        &::after {
          width: 85%;
        }
      }
      &:hover::after {
        width: 85%;
      }
    }

    .dropdown {
      &:hover .dropdown-menu {
        display: block;
      }
    }
  }
}
</style>
