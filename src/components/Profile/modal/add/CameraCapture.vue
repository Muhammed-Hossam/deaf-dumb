<template>
  <div class="capture-photo-add-modal-body">
    <div class="container">
      <div class="row">
        <p class="h2 text-center py-3">Capture a Photo</p>
        <video v-if="!errorMsg" ref="video" class="mb-3" height="370" autoplay></video>
        <p v-else class="text-danger text-center">{{ errorMsg }}</p>
        <ModalLoader v-if="isLoading" />
      </div>
    </div>
  </div>
</template>


<script>
import ModalLoader from '../../ProfileCoverLoadingSpinner.vue';

import { db, auth } from "@/firebaseConfig";
import { doc, updateDoc } from "@firebase/firestore";

export default {
  // Emit vidoe stream to close camera
  emits: ['video-stream', 'modal-mode', 'disable-take-photo-btn'],
  props: ['isPhotoTaken'],
  components: {
    ModalLoader
  },
  data() {
    return {
      isLoading: false,
      videoStream: null,
      errorMsg: null
    };
  },
  methods: {
    async initializeCamera() {
      this.isLoading = true;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        this.$refs.video.srcObject = stream;
        this.videoStream = stream;
        this.$emit('video-stream', stream);
      } catch(error) {
        console.error(error.message)
        this.$emit('disable-take-photo-btn', true)
        if (error.message === 'Permission dismissed') {
          this.errorMsg = "Camera permission request was dismissed. Please refresh the page and try again.";
        }else if (error.message === 'Permission denied') {
          this.errorMsg = "Camera permission was denied. Please grant camera permission in your browser settings.";
        }else {
          this.errorMsg = "An error occurred while accessing the camera. Please try again later."
        }
      } finally {
        this.isLoading = false;
      }
    },
    closeCamera() {
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    },
    takePhoto() {
      const video = this.$refs.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      const capturedImage = canvas.toDataURL('image/jpeg')
      this.uploadTakenPhoto(capturedImage);
    },
    async uploadTakenPhoto(capturedImage) {
      this.isLoading = true;
      const user = auth.currentUser;
      const userRef = doc(db, 'users', user.uid);

      await updateDoc(userRef, {
        fullUserPhoto: capturedImage
      })
      .then(() => {
        console.log('User Photo has Taken Successfully');
        this.$emit('modal-mode', 'edit')
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        this.isLoading = false;
        this.closeCamera();
      })
    }
  },
  mounted() {
    this.initializeCamera();
    console.log(this.isPhotoTaken)
  },
  beforeUnmount() {
    this.closeCamera();
  },
  watch: {
    isPhotoTaken(newValue) {
      if (newValue === true) {
        this.takePhoto();
      }
      console.log('isPhotoTaken: ', newValue);
    }
  }
}
</script>


<style lang="scss" scoped>

</style>