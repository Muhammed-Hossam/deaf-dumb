<template>
  <div class="login-provider-wrapper mb-3 text-center">
    <button class="bg-white p-0 rounded" :style="{'border-color': providerColor}">
      <div class="logo-wrapper d-inline-block w-25">
        <img :src="providerLogo" :alt="alt" width="50" height="50">
      </div>
      <div class="provider-name-wrapper d-inline-block w-75 py-3" :style="{'background-color': providerColor}">
        <span class="fs-5 text-white fw-bold px-2">Login with {{ providerName }}</span>
      </div>
    </button>
  </div>
</template>


<script>
export default {
  props: ['providerLogo', 'providerName', 'alt', 'providerColor']
}
</script>

<style lang="scss" scoped>
.login-provider-wrapper {
  button {
    width: 18rem;
    
  }
}
</style>