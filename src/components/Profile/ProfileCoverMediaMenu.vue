<template>
  <div class="media-menu position-absolute rounded">
    <div
      class="media-menu-header d-flex justify-content-between align-items-center border-bottom mt-1 pb-1"
    >
      <ul class="nav nav-tabs border-0">
        <li class="nav-item">
          <button
            class="nav-link link-dark py-1 px-3 ms-2 me-1 border-0 rounded-3 active"
            ref="upload-tab"
            @click="showTab('upload')"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
            Upload
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link link-dark py-1 px-3 me-1 border-0 rounded-3"
            ref="link-tab"
            @click="showTab('link')"
          >
            <font-awesome-icon icon="fa-solid fa-link" />
            Link
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link link-dark py-1 px-3 border-0 rounded-3"
            ref="unsplash-tab"
            @click="showTab('unsplash')"
          >
            <font-awesome-icon icon="fa-brands fa-unsplash" />
            Unsplash
          </button>
        </li>
      </ul>
      <div class="remove-btn my-1 me-2">
        <button
          class="nav-link link-dark py-1 px-3 border-0 rounded-3"
          @click="removeCoverImg"
        >
          <font-awesome-icon icon="fa-regular fa-trash-can" />
          remove
        </button>
      </div>
    </div>
    <div class="media-content mt-1 p-3">
      <div v-if="currentTab === 'upload'" id="upload" class="tab-pane">
        <button class="border-0 p-2 rounded w-100" @click="openImagePicker">
          <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
          Upload Image
        </button>
        <input
          type="file"
          ref="fileInput"
          class="d-none"
          accept="image/*"
          @change="handleFileChange"
        />
        <div
          v-if="upload.error"
          class="d-block mt-2 text-center invalid-feedback"
        >
          {{ upload.error }}
        </div>
        <div
          v-if="upload.success"
          class="d-block mt-2 text-center valid-feedback"
        >
          {{ upload.success }}
        </div>
      </div>
      <div v-if="currentTab === 'link'" id="link" class="tab-pane">
        <form
          @submit.prevent="handleURLSubmit"
          class="needs-validation"
          novalidate
        >
          <div class="input-group mb-3">
            <input
              v-model="coverLink.url"
              type="url"
              class="form-control"
              placeholder="Paste an image link..."
              aria-label="URL input"
              aria-describedby="basic-addon2"
              required
            />
            <button type="submit" class="btn btn-primary">Submit</button>
            <div v-if="coverLink.success" class="d-block mt-2 text-center valid-feedback">
              {{ coverLink.success }}
            </div>
            <div v-if="coverLink.error" class="d-block mt-2 text-center invalid-feedback">
              {{ coverLink.error }}
            </div>
          </div>
        </form>
      </div>
      <div v-if="currentTab === 'unsplash'" id="unsplash" class="tab-pane">
        <UnsplashSearch @choosen-photo-url="getUnsplashPhotoURL" />
        <div v-if="unsplash.success" class="d-block mt-2 text-center valid-feedback">
          {{ unsplash.success }}
        </div>
        <div v-if="unsplash.error" class="d-block mt-2 text-center invalid-feedback">
          {{ unsplash.error }}
        </div>
      </div>
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

import { mapGetters } from "vuex";

import UnsplashSearch from './UnsplashSearch.vue';

export default {
  components: {
    UnsplashSearch
  },
  emits: ["loading-state"],
  data() {
    return {
      currentTab: "upload",
      isLoading: false,
      upload: {
        success: "",
        error: "",
      },
      coverLink: {
        url: "",
        success: "",
        error: "",
      },
      unsplash: {
        success: '',
        error: '',
      }
    };
  },
  computed: {
    ...mapGetters({
      profileCoverImg: "getProfileCoverImg",
    }),
  },
  methods: {
    showTab(currentTab) {
      this.currentTab = currentTab;
    },
    openImagePicker() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const selectedImg = event.target.files[0];
      if (!selectedImg) {
        this.upload.error = "You don't select any image!";
      } else if (!selectedImg.type.startsWith("image/")) {
        this.upload.error =
          "Please select an image file (e.g., JPG, PNG, GIF).";
      } else {
        this.uploadCoverImg(selectedImg);
      }
    },
    async uploadCoverImg(selectedImg) {
      this.isLoading = true;
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
          profileCoverImg: downloadURL,
        })
          .then(() => {
            this.isLoading = false;
            console.log("profileCoverImg added succesfully");
            this.upload.success = "Profile Cover Image added successfully.";
          })
          .catch((error) => {
            this.upload.error = error.message;
            console.error(error.message);
          });
      });
    },
    async uploadCoverURL(url, coverMethod) {
      this.isLoading = true;
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        profileCoverImg: url,
      })
        .then(() => {
          this.isLoading = false;
          console.log("profileCoverImg added succesfully");
          this[coverMethod].error = "";
          this[coverMethod].success = "Profile Cover Image added successfully.";
        })
        .catch((error) => {
          this[coverMethod].error = error.message;
          console.error(error.message);
        });
    },
    async removeCoverImg() {
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profileCoverImg: null,
        profileCoverImgPosition: 50,
      })
        .then(() => {
          console.log("coverImg Removed successfully");
          this.upload.error = "";
          this.upload.success = "Cover Image Removed Successfully";
        })
        .catch((error) => {
          console.error(error.message);
          this.upload.success = "";
          this.upload.error = error.message;
        });
    },
    async isImageURL(url) {
      // List of image file extensions.
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];

      // check if the URL has a file extension a the end
      const hasFileExtension = imageExtensions.some((ext) =>
        url.toLowerCase().endsWith(ext)
      );

      if (hasFileExtension) {
        return true; // URL has a recognizable image file extension
      } else {
        // URL does not have a file extension, fetch the URL and check Content-Type
        try {
          const response = await fetch(url, { method: "HEAD" });
          if (response.ok) {
            const contentType = response.headers.get("content-type");
            return contentType && contentType.startsWith("image/");
          } else {
            return false;
          }
        } catch (error) {
          console.error("Error fetching the URL ", error);
          this.coverLink.success = "";
          this.coverLink.error = "This is not a Correct URL!";
        }
      }
    },
    async handleURLSubmit() {
      try {
        const isValidURL = await this.isImageURL(this.coverLink.url);

        if (isValidURL) {
          this.uploadCoverURL(this.coverLink.url, 'coverLink');
        } else {
          this.coverLink.error =
            "This is not a valid image URL. Please provide a correct URL.";
        }
      } catch (error) {
        console.error(error);
        this.coverLink.error = "An error occurred while validating the URL.";
      }
    },
    getUnsplashPhotoURL(url) {
      this.unsplash.url = url;
      this.uploadCoverURL(url, 'unsplash');
    }
  },
  watch: {
    currentTab(newValue, oldValue) {
      this.$refs[`${newValue}-tab`].classList.add("active");
      this.$refs[`${oldValue}-tab`].classList.remove("active");
    },
    isLoading(newValue) {
      this.$emit("loading-state", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/custom.scss";

.media-menu {
  width: 34rem;
  background-color: #fff;
  top: 10rem;
  right: 0.5rem;
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  .nav {
    .nav-item {
      .nav-link {
        transition: all 0.3s ease-in-out;

        &:hover,
        &.active {
          background-color: #ddd;
        }
      }
    }
  }

  .remove-btn {
    button {
      background-color: transparent;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: orangered !important;
      }

      &:active {
        background-color: #ddd;
        color: black !important;
      }
    }
  }
}

.media-content {
  max-height: 60vh;
  overflow: auto;

  #upload {
    button {
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #ddd;
      }

      &:active {
        background-color: #f0f0f0;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .media-menu {
    width: 96% !important;
    top: 3rem !important;

    .nav {
      .nav-item {
        .nav-link {
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
          font-size: 0.9rem;
        }
      }
    }

    .remove-btn {
      button {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
        font-size: 0.9rem;
      }
    }
  }
}
</style>