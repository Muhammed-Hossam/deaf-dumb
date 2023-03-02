<template>
  <button class="p-2 mb-3 w-100 bg-white">
      <img :src="providerLogo" :alt="alt" class="me-3" style="width: 40px !important">
    <span class="fs-5">Login with {{ providerName }}</span>
  </button>
</template>


<script>
export default {
  props: ['providerLogo', 'providerName', 'alt']
}
</script>

<style lang="scss" scoped>
button {
  border: 1px solid #f60;
  
}
</style>