<template>
  <div class="modal-body">
    <div v-if="userPhoto" class="user-photo mx-auto my-4">
      <img
        :src="userPhoto"
        class="w-100 h-100 rounded-circle"
        alt=""
      />
    </div>
      <p v-else class="no-photo text-warning mx-auto my-auto">
        You are not have a profile Photo, try to add one
      </p>
  </div>
</template>

<script>

export default {
  props: ['userPhoto']
};
</script>


<style lang="scss" scoped>
.modal-body {
  height: 18rem;
  .user-photo {
    width: 15rem;
    height: 15rem;
  }
  .no-photo {
    text-align: center;
    margin-top: 7.5rem !important;
    font-size: 1.5rem;
    font-weight: 500;
  }
}
</style>