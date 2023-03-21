<template>
  <div class="col-4 col-md-3 col-lg-2">
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
  emits: ['show-content', 'showLetter', 'showImgSrc'],
  data() {
    return {
      show: false
    }
  },
  methods: {
    showContent() {
      this.show = true;
      this.$emit('show-content', this.show);
      this.$emit('showLetter', this.letter);
      this.$emit('showImgSrc', this.imgSrc);
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
  
}

</style>
