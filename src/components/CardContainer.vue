<template>
  <div class="card-container rounded p-5 my-5">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

div {
  box-shadow: $main-shadow;
}
</style>