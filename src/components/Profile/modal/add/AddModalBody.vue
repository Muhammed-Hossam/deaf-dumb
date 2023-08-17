<template>
  <div class="modal-body">
    <div class="default-add-photo-modal-body" v-if="!isCameraOpened">
      <p class="h3 text-center my-5">{{ userName }}, Upload your photo</p>
      <div class="user-photo mx-auto">
        <img :src="userPhoto" class="w-100 h-100 rounded-circle" alt="" />
      </div>
      <p class="fs-6 text-center text-muted my-5">
        Take or upload a photo of yourself. Then crop it
      </p>
    </div>
    <CameraCapture
      v-else
      @video-stream="getVideoStream"
      :isPhotoTaken="isPhotoTaken"
      @modal-mode="getModalMode"
    />
    <ProfileLoader v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileLoader from "../../ProfileCoverLoadingSpinner.vue";
import CameraCapture from "./CameraCapture.vue";

export default {
  props: ["userPhoto", "isLoading", "isCameraOpened", "isPhotoTaken"],
  emits: ["video-stream", 'modal-mode'],
  components: {
    ProfileLoader,
    CameraCapture,
  },
  data() {
    return {
    };
  },
  methods: {
    getVideoStream(stream) {
      this.$emit("video-stream", stream);
    },
    getModalMode(mode) {
      this.$emit('modal-mode', mode);
    },
  },
  computed: {
    ...mapGetters({
      userName: "getUserName",
    }),
  },
};
</script>


<style lang="scss" scoped>
.modal-body {
  .user-photo {
    width: 10rem;
    height: 10rem;
  }
}
</style>