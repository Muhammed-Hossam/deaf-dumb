<template>
  <div class="user-greeting-section dropdown">
    <span class="userName fw-bold me-2">
      <span class="text-dark">Hi,</span> {{ userName }}
    </span>
    <button class="user-img-btn rounded-circle border d-inline-block" type="button" data-bs-toggle="dropdown"
      aria-expanded="false">
      <font-awesome-icon v-if="!userPhoto" icon="fa-solid fa-user" />
      <img v-else :src="userPhoto" class="user-photo rounded-circle" alt="user-pic" referrerpolicy="no-referrer" />
    </button>
    <ul class="dropdown-menu text-center end-0">
      <li>
        <button class="btn p-3 w-100 rounded-0" @click="logoutUser">
          Logout
        </button>
      </li>
      <li>
        <router-link class="dropdown-item mb-2" to="/profile">Profile</router-link>
      </li>
      <li v-if="role === 'admin'">
        <router-link class="dropdown-item" to="/dashboard">Dashboard</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['userName', 'userPhoto', 'role'],
  emits: ['logout-user'],
  methods: {
    logoutUser() {
      this.$emit('logout-user')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/custom.scss";


.user-greeting-section {
  .user-img-btn {
    text-align: center;
    line-height: 50px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover,
    &:focus {
      box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.12);
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
    margin-top: 0.5rem;
    background-color: $app-bg;

    button {
      transition: all 0.3s ease-in-out;
    }

    button:hover {
      background-color: #ddd;
    }

    .dropdown-item {
      padding-top: 1.3rem;
      padding-bottom: 1.3rem;

      &:hover,
      &.router-link-active {
        background-color: $main-color;
        color: white !important;
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .user-greeting-section-mobile {
    position: unset !important;
    .dropdown-menu {
      position: unset !important;
    }
  }
}

</style>