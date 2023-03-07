<template>
  <Transition>
    <div v-if="show" @click="closeContent" class="overlay position-absolute top-0 end-0 bottom-0 start-0"></div>
  </Transition>
  <div class="letter-card">
    <div class="letter p-2 my-3 d-flex justify-content-center align-items-center" @click="showContent">
      <span class="fs-1 fw-bold">{{ letter }}</span>
    </div>
    <Transition>
      <div v-if="show" class="content rounded p-3 position-absolute top-50">
        <img :src="imgSrc" :alt="`${letter} sign language image`" class="w-100 mt-5">
        <div class="close-btn w-100 position-absolute top-0 end-0 rounded-top">
          <span @click="closeContent" class="close-icon">
            <font-awesome-icon icon="fa-regular fa-circle-xmark" class="fs-4" />
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: ['letter', 'imgSrc'],
  data() {
    return {
      show: false
    }
  },
  methods: {
    showContent() {
      this.show = true;
    },
    closeContent() {
      this.show = false;
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
  .content {
    width: 60%;
    height: fit-content;
    background-color: white;
    box-shadow: 0 1px 5px 2px rgb(0 0 0 / 10%);
    left: 50%;
    transform: translateX(-50%);
    top: 5%;
  }
  .close-btn {
    // cursor: pointer;
    // width: 100%;
    text-align: end;
    padding: 1rem;
    background-color: white;
    box-shadow: 0px 1px 4px 3px rgb(0 0 0 / 10%);

    .close-icon {
      cursor: pointer;

      svg {
        transition: all 0.3s ease-in-out;

        &:hover {
          color: orangered;
        }
      }
    }
  }
}
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
