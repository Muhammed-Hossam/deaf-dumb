<template>
  <div class="col-4 col-md-3 col-lg-2">
    <router-link :to="`/dictionary/${letter}`" class="letter p-2 my-3 d-flex justify-content-center align-items-center text-decoration-none text-black">
      <span class="fs-1 fw-bold">{{ letter }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['letter']
}
</script>


<style lang="scss" scoped>
  .letter {
    width: 7rem;
    height: 7rem;
    box-shadow: 0 1px 5px 2px rgb(0 0 0 / 10%);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  
    &:hover {
      box-shadow: 0 1px 5px 5px rgb(0 0 0 / 10%);
      transform: scale(1.03);
    }
  }
</style>