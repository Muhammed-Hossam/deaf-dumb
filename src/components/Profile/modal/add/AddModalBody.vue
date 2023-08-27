<template>
  <div class="modal-body">
    <div class="default-add-photo-modal-body" v-if="!isCameraOpened">
      <p class="h3 text-center my-4">{{ userName }}, Upload your photo</p>
      <div class="user-photo mx-auto">
        <img :src="userPhoto ? userPhoto : profilePhotoPlaceholder" class="w-100 h-100 rounded-circle" alt="" />
      </div>
      <p class="fs-6 text-center text-muted my-4">
        Take or upload a photo of yourself. Then crop it
      </p>
    </div>
    <CameraCapture
      v-else
      @video-stream="getVideoStream"
      :isPhotoTaken="isPhotoTaken"
      @modal-mode="getModalMode"
      @disable-take-photo-btn="disableTakePhotoBtn"
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
  emits: ["video-stream", 'modal-mode', 'disable-take-photo-btn'],
  components: {
    ProfileLoader,
    CameraCapture,
  },
  data() {
    return {
      profilePhotoPlaceholder: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODQ1NTB8MHwxfHNlYXJjaHwxfHxwcm9maWxlfGVufDB8fHx8MTY5MzEzNzQ2NHww&ixlib=rb-4.0.3&q=80&w=200'
    };
  },
  methods: {
    getVideoStream(stream) {
      this.$emit("video-stream", stream);
    },
    getModalMode(mode) {
      this.$emit('modal-mode', mode);
    },
    disableTakePhotoBtn(value) {
      this.$emit('disable-take-photo-btn', value)
    }
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