<template>
  <router-link
    :to="link"
    class="word-card bg-white d-flex d-flex align-items-center justify-content-center text-decoration-none text-black">
      <img :src="previewImg" :alt="`${word}-sign-preview`" />
    <p class="text-center my-auto fs-3 fw-bold">{{ word }}</p>
  </router-link>
</template>

<script>
export default {
  props: ['link', 'previewImg', 'word']
}
</script>

<style lang="scss" scoped>
.word-card {
  display: flex;
    box-shadow: 0px 2px 14px rgb(0 0 0 / 10%);
    border-radius: 100px;
    border: 1px solid transparent;
    margin-bottom: 24px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 5px 0px 10px rgb(0 0 0 / 10%);
    border-radius: 1px solid transparent;
  }

  p {
    width: 250px;
  }

  &:hover {
    border: 1px solid #C5E1FB;
    box-shadow: 5px 0px 10px rgb(0 0 0 / 5%);

    img {
      border: 1px solid #C5E1FB;
      box-shadow: 5px 0px 10px rgb(0 0 0 / 5%);
    }

    p {
      color: dodgerblue;
    }
  }
}
</style>
