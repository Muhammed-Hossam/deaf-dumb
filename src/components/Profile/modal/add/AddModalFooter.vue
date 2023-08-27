<template>
  <div class="modal-footer border-top py-3">
    <div class="default-add-modal-footer" v-if="!isCameraOpened">
      <button class="use-camera-btn btn btn-outline-primary me-3 rounded-pill" @click="openCamera">
        <span class="camera-icon me-2">
          <font-awesome-icon icon="fa-solid fa-camera-retro" size="lg" />
        </span>
        <span>Use Camera</span>
      </button>
      <button class="upload-btn btn btn-primary me-3 rounded-pill" @click="openImagePicker">
        <span class="upload-icon me-2">
          <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" size="lg" />
        </span>
        <span>Upload Photo</span>
        </button>
        <input type="file" ref="fileInput" class="d-none" accept="image/*" @change="handleFileChange" />
    </div>
    <div class="use-camera-footer d-flex justify-content-between w-100" v-else>
      
        <button class="cancel btn btn-light ms-3 rounded" @click="closeCamera">Cancel</button>
        <button class="take-photo btn btn-primary me-3 rounded-pill" @click="takePhoto" :disabled="isTakePhotoBtnDisabled">Take Photo</button>
      
    </div>
  </div>
</template>


<script>
import { db, storage, auth } from "@/firebaseConfig";
import { doc, updateDoc } from "@firebase/firestore";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";

export default {
  emits: ['is-loading', 'modal-mode', 'open-camera', 'take-photo'],
  props: ['videoStream', 'isTakePhotoBtnDisabled'],
  data() {
    return {
      upload: {
        success: '',
        error: ''
      },
      isCameraOpened: false
    }
  },
  methods: {
    openImagePicker() {
      this.$refs.fileInput.click();
    },
    openCamera() {
      this.$emit('open-camera', true);
      this.isCameraOpened = true;
    },
    closeCamera() {
      this.$emit('open-camera', false);
      this.$emit('take-photo', false);
      this.isCameraOpened = false;

      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    },
    takePhoto() {
      this.$emit('take-photo', true)
    },
    handleFileChange(event) {
      const selectedImg = event.target.files[0];
      if (!selectedImg) {
        this.upload.error = "You don't select any image!";
      } else if (!selectedImg.type.startsWith("image/")) {
        this.upload.error = "Please select an image file (e.g., JPG, PNG, GIF).";
      } else {
        this.uploadUserPhoto(selectedImg);
      }
    },
    async uploadUserPhoto(selectedImg) {
      this.$emit('is-loading', true);
      const imageStorageRef = storageRef(
        storage,
        `profile/${selectedImg.name}`
      );
      const uploadImage = uploadBytesResumable(imageStorageRef, selectedImg);
      uploadImage.on("state_changed", null, null, async () => {
        // Get the download URL and save the profile cover image
        const user = auth.currentUser;
        const downloadURL = await getDownloadURL(uploadImage.snapshot.ref);
        const usersRef = doc(db, "users", user.uid);
        await updateDoc(usersRef, {
          fullUserPhoto: downloadURL,
          croppedUserPhoto: downloadURL
        })
          .then(() => {
            console.log("profileCoverImg added succesfully");
            this.upload.success = "Profile Cover Image added successfully.";
            this.$emit('modal-mode', 'edit');
            this.$emit('is-loading', false);
          })
          .catch((error) => {
            this.upload.error = error.message;
            console.error(error.message);
          })
          .finally(() => {
            this.$emit('is-loading', false);
          });
      });
    },
  },
}
</script>


<style lang="scss" scoped>

</style>