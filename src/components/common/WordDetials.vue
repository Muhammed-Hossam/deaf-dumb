<template>
      <div class="container my-5 py-5">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h2 class="fs-1 fw-bolder">{{ word }}</h2>
          <p class="description text-gray fs-5">
            {{ description }}
          </p>
        </div>
        <div class="col-md-6">
          <div class="inner-img">
            <img :src="innerImg" class="w-100" :alt="`${word}-image`">
          </div>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  props: ['word', 'description', 'innerImg']
}
</script>