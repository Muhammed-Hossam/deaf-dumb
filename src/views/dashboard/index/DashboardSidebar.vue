<template>
  <aside class="sidebar" :class="{ 'open': isSidebarOpen }">
    <div class="menu-icon text-center mt-3" :class="{ 'text-right': isSidebarOpen }" @click="toggleSidebar">
      <font-awesome-icon v-if="!isSidebarOpen" :icon="['fas', 'bars']" size="2xl" />
      <font-awesome-icon v-else :icon="['fas', 'xmark']" size="2xl" />
    </div>
    <div class="sidebar-content" v-if="isSidebarOpen">
      <p class="dashboard-heading h2 text-center fw-bolder mt-3">Dashboard</p>
      <ul class="nav flex-column mt-5 align-items-center">
        <li class="nav-item w-100 text-center mb-5">
          <router-link to="/dashboard/overview" class="nav-link fs-5 fw-bold active"
            aria-current="page">Overview</router-link>
        </li>
        <li class="nav-item w-100 text-center mb-5">
          <router-link to="/dashboard/addNewItem" class="nav-link fs-5 fw-bold">Add New Item</router-link>
        </li>
        <li class="nav-item w-100 text-center">
          <router-link to="/dashboard/manageUsers" class="nav-link fs-5 fw-bold">Manage Users</router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
  
<script>
export default {
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.$emit('toggleSidebar', this.isSidebarOpen);
    }
  }
};
</script>
  
<style lang="scss" scoped>
$sidebar-bg: #343a40;

.sidebar {
  position: fixed;
  width: 3rem;
  height: 100%;
  background-color: $sidebar-bg;
  transition: width 0.3s ease-in-out;
  top: 75px;
  left: 0;

  &.open {
    width: 12rem;
  }

  .menu-icon {
    cursor: pointer;
    color: #ddd;
    transition: all 0.3s ease-in-out;

    &.text-right {
      text-align: end !important;
      margin-right: 1rem;
    }

    &:hover {
      color: #fff;
    }
  }

  .sidebar-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .dashboard-heading {
    color: #ffc107
  }

  .nav {
    margin-top: 1rem;
    padding: 0;
    list-style: none;
    color: #fff;

    .nav-item {

      .nav-link {
        display: block;
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: #fff !important;

        &:hover,
        &.router-link-exact-active {
          background-color: #fff;
          color: $sidebar-bg !important;
        }
      }
    }

  }
}
</style>