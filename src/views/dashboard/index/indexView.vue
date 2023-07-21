<template>
  <div>
    <DashboardSidebar @toggleSidebar="toggleSidebar" />
    <div :class="{ 'dashboard-content mt-8': true, 'sidebar-open': isSidebarOpen }">
      <router-view />
    </div>
  </div>
</template>


<script>
import DashboardSidebar from './DashboardSidebar.vue';
export default {
  components: {
    DashboardSidebar
  },
  data() {
    return {
      isSidebarOpen: false
    }
  },
  methods: {
    toggleSidebar(payload) {
      this.isSidebarOpen = payload;
    }
  }
}
</script>


<style lang="scss" scoped>
.dashboard-content {
  margin-left: 3rem;
  transition: all 0.3s ease-in-out;

  &.sidebar-open {
    margin-left: 12rem;
  }
}
</style>