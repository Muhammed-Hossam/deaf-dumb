<template>
  <div class="profile-user-photo-modal position-relative">
    <card-container
      class="w-50 bg-light position-absolute top-50 start-50 translate-middle"
    >
      <ModalHeader
        :modalMode="modalMode"
        @return-default="returnToDefaultMode"
        @close-modal="closeModal"
      />

      <!-- Start Default Mode -->
      <DefaultModalBody
        v-if="modalMode === 'default'"
        :userPhoto="croppedUserPhoto"
      />
      <DefaultModalFooter
        v-if="modalMode === 'default'"
        @action-mode="changeModalMode"
      />
      <!-- End Default Mode -->

      <!-- Start Edit Mode -->
      <EditModalBody
        v-if="modalMode === 'edit'"
        :fullUserPhoto="fullUserPhoto"
        :isLoading="editModaLoadingState"
        @cropped-image="getCroppedImage"
      />
      <EditModalFooter
        v-if="modalMode === 'edit'"
        :croppedImageURL="croppedImageURL"
        @is-loading="getEditLoadingState"
      />
      <!-- End Edit Mode -->

      <!-- Start Add Mode -->
      <AddModalBody
        v-if="modalMode === 'add'"
        :userPhoto="croppedUserPhoto"
        :isLoading="addModaLoadingState"
        :isCameraOpened="isCameraOpened"
        @video-stream="getVideoStream"
        :isPhotoTaken="isPhotoTaken"
        @modal-mode="changeModalMode"
      />
      <AddModalFooter
        v-if="modalMode === 'add'"
        @is-loading="getAddLoadingState"
        @modal-mode="changeModalMode"
        @open-camera="openCamera"
        :videoStream="cameraVideoStream"
        @take-photo="getPhotoTakenState"
      />
      <!-- End Add Mode -->

      <AlertModal
        title="Remove Photo"
        body="Are you sure removing your photo?"
        closeBtn="Close"
        confirmBtn="Confirm"
        @is-confirm="removeUserPhoto"
      />
    </card-container>
  </div>
</template>

<script>
import CardContainer from "../../common/CardContainer.vue";

import ModalHeader from "./ModalHeader.vue";
import DefaultModalBody from "./default/DefaultModalBody.vue";
import DefaultModalFooter from "./default/DefaultModalFooter.vue";
import EditModalBody from "./edit/EditModalBody.vue";
import EditModalFooter from "./edit/EditModalFooter.vue";
import AddModalBody from "./add/AddModalBody.vue";
import AddModalFooter from "./add/AddModalFooter.vue";

import { mapGetters } from "vuex";
import AlertModal from "@/components/common/AlertModal.vue";
import { auth, db } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export default {
  emits: ["close-modal"],
  components: {
    CardContainer,
    ModalHeader,
    DefaultModalBody,
    DefaultModalFooter,
    EditModalBody,
    EditModalFooter,
    AddModalBody,
    AddModalFooter,
    AlertModal,
  },
  data() {
    return {
      modalMode: "default",
      croppedImageURL: null,
      editModaLoadingState: false,
      addModaLoadingState: false,
      isCameraOpened: false,
      cameraVideoStream: null,
      isPhotoTaken: false,
    };
  },
  methods: {
    closeModal(value) {
      this.$emit("close-modal", value);
    },
    changeModalMode(value) {
      this.modalMode = value;
    },
    returnToDefaultMode(value) {
      this.modalMode = value;
    },
    getCroppedImage(imgURL) {
      this.croppedImageURL = imgURL;
    },
    getEditLoadingState(state) {
      this.editModaLoadingState = state;
    },
    getAddLoadingState(state) {
      this.addModaLoadingState = state;
    },
    openCamera(value) {
      this.isCameraOpened = value;
    },
    getVideoStream(stream) {
      this.cameraVideoStream = stream;
    },
    getPhotoTakenState(state) {
      this.isPhotoTaken = state;
    },
    removeUserPhoto() {
      const user = auth.currentUser;
      const userRef = doc(db, 'users', user.uid);
      updateDoc(userRef, {
        fullUserPhoto: '',
        croppedUserPhoto: ''
      })
      .then(() => {
        console.log('userPhoto removed successfully');
      })
      .catch((error) => {
        console.error(error.message);
      })
    }
  },
  computed: {
    ...mapGetters({
      fullUserPhoto: "getFullUserPhoto",
      croppedUserPhoto: "getCroppedUserPhoto",
    }),
  },
};
</script>


<style lang="scss" scoped>
.profile-user-photo-modal {
  z-index: 1000;
  top: -5rem;
  .card-container {
    padding: 0 !important;
  }
}
</style>