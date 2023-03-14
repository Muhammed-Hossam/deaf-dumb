<template>
  <div class="flip-card mx-auto">
    <div class="flip-card-inner rounded" :class="{rotate: rotate}">
      <div class="flip-card-front rounded">
        <!-- Front side content here -->
        <h2>{{ card.word }}</h2>
      </div>
      <div class="flip-card-back rounded">
        <!-- Back side content here -->
        <img :src="correctImg" class="w-100 h-100 rounded" alt="correct-img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card', 'rotate'],
  data() {
    return {
      correctImg: ''
    }
  },
  mounted() {
    const card = this.card
    card.signs.forEach(signObj => {
      if (signObj.isCorrect) {
        this.correctImg = signObj.sign;
      }
    })
    console.log('Card: ', card)
  }
}
</script>

<style lang="scss" scoped>
.flip-card {
  background-color: transparent;
  perspective: 1000px;
  width: 200px;
  height: 200px;

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 0px 5px 2px rgb(0 0 0 / 10%);
  }


  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-card-front {
    background-color: #fff;
    h2 {
      line-height: 200px;
    }
  }

  .flip-card-back {
    // background-color: #eaeaea;
    transform: rotateY(180deg);
    box-shadow: 0 0px 5px 2px rgb(0 0 0 / 10%);
  }
}

.rotate {
  transform: rotateY(180deg);
}
</style>
