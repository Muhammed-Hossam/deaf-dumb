<template>
  <section class="text-center my-3">
    <h2 class="title my-5">{{ title }}</h2>
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>


<script>
export default {
  props: ['title']
}
</script>


<style lang="scss" scoped>
section {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  .title {
    display: inline-block;
    border: 2px solid #000;
    padding: 0.7rem 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-in-out;

    &::after,
    &::before {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      // background-color: #2196f3;
      background-color: #02b1b4;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
    }

    &::after {
      right: -30px;
    }
    &::before {
      left: -30px;
    }

    &:hover::after {
      z-index: -1;
      animation: right-move 0.5s linear forwards;
    }
    &:hover::before {
      z-index: -1;
      animation: left-move 0.5s linear forwards;
    }

    &:hover {
      color: #fff;
      border: 2px solid #fff;
      border-radius: 5px;
      transition-delay: 0.5s;
    }
  }

  @keyframes left-move {
  50% {
    left: 0;
    width: 12px;
    height: 12px;
  }

  100% {
    left: 0;
    border-radius: 0;
    width: 100%;
    height: 100%;
  }
}

@keyframes right-move {
  50% {
    right: 0;
    width: 12px;
    height: 12px;
  }

  100% {
    right: 0;
    border-radius: 0;
    width: 100%;
    height: 100%;
  }
}

}
</style>