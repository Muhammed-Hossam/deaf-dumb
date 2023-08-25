<template>
  <div class="col-4 col-md-3 col-lg-2 d-flex justify-content-center">
    <div class="letter-card">
      <div class="letter p-2 my-3 d-flex justify-content-center align-items-center" @click="showContent">
        <span class="fs-1 fw-bold">{{ letter }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['letter', 'imgSrc'],
  emits: ['show-content'],
  data() {
    return {
      show: false
    }
  },
  methods: {
    showContent() {
      this.show = true;
      const content = {
        show: this.show,
        letter: this.letter,
        imgSrc: this.imgSrc
      }
      this.$emit('show-content', content);
    },
    closeContent() {
      this.show = false;
      this.$emit('show-content', this.show);
    }
  }
};
</script>

<style lang="scss" scoped>
.letter-card {
  
  .letter {
    width: 8rem;
    height: 8rem;
    box-shadow: 0 1px 5px 1px rgb(0 0 0 / 10%);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  
    &:hover {
      box-shadow: 0 1px 5px 3px rgb(0 0 0 / 10%);
      transform: scale(1.03);
    }
  }
  
}

</style>
