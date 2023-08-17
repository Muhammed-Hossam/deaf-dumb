<template>
  <div class="modal-body">
    <div class="user-photo mx-auto my-4">
      <img
        :src="userPhoto"
        class="w-100 h-100 rounded-circle"
        alt=""
      />
    </div>
  </div>
</template>

<script>

export default {
  props: ['userPhoto']
};
</script>


<style lang="scss" scoped>
.modal-body {
  .user-photo {
    width: 15rem;
    height: 15rem;
  }
}
</style>