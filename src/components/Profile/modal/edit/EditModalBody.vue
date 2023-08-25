<template>
  <div class="modal-body my-5">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <cropper
            class="cropper mx-auto"
            :src="fullUserPhoto"
            :stencil-props="{
              aspectRatio: 10 / 12,
              previewClass: 'preview',
            }"
            stencil-component="circle-stencil"
            @change="change"
          />
        </div>
        <div class="col-4">
          <img
            :src="croppedImageURL"
            referrerpolicy="no-referrer"
            class="preview-cropper-img rounded-circle"
            alt="preview-profile-img"
          />
        </div>
      </div>
    </div>
    <ProfileLoader v-if="isLoading" />
  </div>
</template>


<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import ProfileLoader from '../../ProfileCoverLoadingSpinner.vue';



export default {
  emits: ['cropped-image'],
  props: ['fullUserPhoto', 'isLoading'],
  components: {
    Cropper,
    ProfileLoader
  },
  data() {
    return {
      croppedImageURL: null,
    };
  },
  methods: {
    change({ canvas }) {
      this.croppedImageURL = canvas.toDataURL();
      this.$emit('cropped-image', this.croppedImageURL);
      console.log(this.croppedImageURL);
    },
  },
  mounted() {
  },
};
</script>


<style lang="scss">
@import "../../../../scss/custom.scss";

.modal-body {
  overflow: auto;
  .cropper {
    height: 350px;
    width: 350px;
    background: #ddd;
  
    .preview {
      border: dashed 2px #ddd !important;
    }
  }
  
  .preview-cropper-img {
    width: 10rem;
    height: 10rem;
    border: 2px solid #888;
  }
}

@include media-breakpoint-down(sm) {
  .preview-cropper-img {
    width: 6rem !important;
    height: 6rem !important;
  }
}
</style>