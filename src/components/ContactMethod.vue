<template>
  <div class="info fs-5 mb-3 fw-bold text-start">
    <span class="icon text-center">
      <font-awesome-icon :icon="iconClass" />
    </span>
      <a :href="hrefValue" class="text-decoration-none d-inline-block text-center"
        >{{ value }}</a
      >
  </div>
</template>

<script>
export default {
  props: ['iconClass', 'hrefValue', 'value']
};
</script>

<style lang="scss" scoped>
.info {
  border-radius: 50px;
  box-shadow: 0 1px 5px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;

  .icon {
    display: inline-block;
    border-right: 1px solid #ccc;
    width: 20%;
    background: #02b1b4;
    color: orange;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  a {
    width: calc(100% - 20%);
    font-size: 0.6875rem;
  }

}
  @media (min-width: 992px) {
    .info {
      height: 4rem;

      .icon {
        height: inherit;
        line-height: 4rem;
        font-size: 2rem;
      }
      
      a {
        line-height: 4rem;
        font-size: 1.4rem;
      }
    }
  }
</style>
