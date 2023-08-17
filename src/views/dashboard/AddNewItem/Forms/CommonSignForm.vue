<template>
  <Teleport to="body">
    <LoadingSpinner v-if="isLoading" />
  </Teleport>
  <form @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="common-word" class="form-label ms-2">Word:</label>
      <input
        type="text"
        class="form-control"
        id="common-word"
        placeholder="Enter Common Sign Word"
        v-model="commonSigns.word"
      />
    </div>
    <div class="mb-3">
      <label for="common-prev" class="form-label ms-2">Preview Image:</label>
      <input
        class="form-control"
        type="file"
        id="common-prev"
        @change="handleCommonSignPreviewInput"
      />
    </div>
    <div class="mb-3">
      <label for="common-inner" class="form-label ms-2">Inner Image:</label>
      <input
        class="form-control"
        type="file"
        id="common-inner"
        @change="handleCommonSignInnerInput"
      />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label ms-2">Description:</label>
      <textarea
        class="form-control"
        id="description"
        placeholder="Enter the description of the Image"
        v-model="commonSigns.description"
        rows="3"
      ></textarea>
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</template>

<script>
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { doc, setDoc } from "@firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { useToast } from "vue-toastification";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

export default {
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
      commonSigns: {
        word: "",
        previewImage: "",
        innerImage: "",
        description: "",
      },
    };
  },
  methods: {
    handleCommonSignPreviewInput(e) {
      const previewCommonSign = e.target.files[0];
      this.commonSigns.previewImage = previewCommonSign;
    },
    handleCommonSignInnerInput(e) {
      const innerCommonSign = e.target.files[0];
      this.commonSigns.innerImage = innerCommonSign;
    },
    uploadCommonSignsData() {
      const toast = useToast();
      this.isLoading = true;
      const previewImageStorageRef = storageRef(
        storage,
        `common-signs/${this.commonSigns.previewImage.name}`
      );
      const innerImageStorageRef = storageRef(
        storage,
        `common-signs/${this.commonSigns.innerImage.name}`
      );
      const uploadPreviewImage = uploadBytesResumable(
        previewImageStorageRef,
        this.commonSigns.previewImage
      );
      const uploadInnerImage = uploadBytesResumable(
        innerImageStorageRef,
        this.commonSigns.innerImage
      );
      Promise.all([uploadPreviewImage, uploadInnerImage])
        .then(() => {
          // Get the download URLs and save the common sign data to firestore
          this.isLoading = true;
          Promise.all([
            getDownloadURL(uploadPreviewImage.snapshot.ref),
            getDownloadURL(uploadInnerImage.snapshot.ref),
          ])
            .then(([previewDownloadURL, innerDownloadURL]) => {
              const commonSignsRef = doc(
                db,
                "commonSigns",
                this.commonSigns.word
              );
              setDoc(commonSignsRef, {
                word: this.commonSigns.word,
                previewImg: previewDownloadURL,
                innerImg: innerDownloadURL,
                description: this.commonSigns.description,
              })
                .then(() => {
                  this.isLoading = false;
                  toast.success("Data Added Successfully.", this.toastOptions);
                  this.commonSigns.word = "";
                  this.commonSigns.previewImage = "";
                  this.commonSigns.innerImage = "";
                  this.commonSigns.description = "";
                })
                .catch((error) => {
                  toast.error(error.message, this.toastOptions);
                  this.isLoading = false;
                });
            })
            .catch((error) => {
              toast.error(error.message, this.toastOptions);
              this.isLoading = false;
            });
        })
        .catch((error) => {
          toast.error(error.message, this.toastOptions);
          this.isLoading = false;
        });
    },
    submitForm() {
      if (
        this.commonSigns.word &&
        this.commonSigns.previewImage &&
        this.commonSigns.innerImage &&
        this.commonSigns.description
      ) {
        this.uploadCommonSignsData();
      } else {
        const toast = useToast();
        toast.error("You should complete all fields!");
      }
    },
  },
  computed: {
    toastOptions() {
      return {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      };
    },
  },
};
</script>
