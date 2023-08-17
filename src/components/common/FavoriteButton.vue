<template>
  <div role="button" class="favorite-btn position-absolute" @click="toggleFavBtn">
    <font-awesome-icon v-if="!isFavorited" icon="fa-regular fa-heart" size="2xl" />
    <font-awesome-icon v-else icon="fa-solid fa-heart" size="2xl" />
  </div>
</template>

<script>
export default {
  emits: ['toggle-favorite'],
  props: {
    isFavorited: Boolean,
  },
  methods: {
    toggleFavBtn() {
      this.$emit('toggle-favorite')
    }
  }
}
</script>

<style lang="scss" scoped>
.favorite-btn {
  right: 3rem;
  top: 7rem;
  color: red;
}
</style>