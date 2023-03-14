<template>
  <div
    class="rounded image-card"
    :class="{
      active: isActive && isCorrect === null,
      correct: isActive && isCorrect === true,
      wrong: isActive && isCorrect === false,
      disabled: !isActive && isAnswerd,
      unclickable: isActive && isAnswerd
    }"
    @click="$emit('click')"
  >
    <img :src="imageUrl" alt="image" class="w-100 h-100 rounded" />
  </div>
</template>

<script>
export default {
  props: ["imageUrl", "isCorrect", "isActive", "isAnswerd"],
};
</script>


<style lang="scss" scoped>
.image-card {
  width: 200px;
  height: 200px;
  background-color: #fff;
  box-shadow: 0 1px 5px 2px rgb(0 0 0 / 10%);
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.active {
  border: 2px solid #0d6efd; 
}

.correct {
  border: 2px solid rgb(10, 223, 10);
}

.wrong {
  border: 2px solid rgb(211, 16, 16);
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.unclickable {
  pointer-events: none;
}
</style>