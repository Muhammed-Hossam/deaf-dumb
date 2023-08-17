<template>
  <Teleport to="body">
    <div
      class="overlay position-absolute top-0 end-0 bottom-0 start-0"
      @click="closeMediaMenu"
      :class="{ 'd-block': isOverlayOpen }"
    ></div>
  </Teleport>
  <div class="profile mb-5">
    <div class="profile-cover-img-wrapper position-relative" ref="coverImgWrapper" @dragover="startDrag" @drag="handleDrag" @dragend="handleDrag" :draggable="profileCoverImg ? true : false">
      <img
        v-if="profileCoverImg"
        class="w-100 h-100"
        draggable="true"
        ref="coverImg"
        :src="profileCoverImg"
        :style="{ objectPosition: `center ${getCoverImgPosition}%` }"
        alt="cover-img"
      />
      <ProfileCoverLoader v-if="isLoading" />
      <div class="control-profile-cover-img position-absolute end-0 me-3 d-none">
        <button v-if="!isRepositioning" class="me-1" @click="addCover">
          {{ profileCoverImg ? "Change" : "Add" }} Cover
        </button>
        <button v-else class="me-1" @click="savePositioning">
          Save Position
        </button>
        <div v-if="profileCoverImg" class="d-inline">
          <button v-if="!isRepositioning" @click="startReposition">
            Reposition
          </button>
          <button v-else @click="cancelReposition">Cancel</button>
        </div>
      </div>
      <ProfileCoverMediaMenu v-if="isAddCoverBtnClicked" @loading-state="handleLoading" />
    </div>
    <ProfileUserData />
    <div class="container">
      <div class="row">
        <h1>Favourites...</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, updateDoc } from "firebase/firestore";
import { mapGetters } from "vuex";
import { auth, db } from "@/firebaseConfig";

import ProfileCoverMediaMenu from "@/components/Profile/ProfileCoverMediaMenu.vue";
import ProfileCoverLoader from "@/components/Profile/ProfileCoverLoadingSpinner.vue";
import ProfileUserData from '@/components/Profile/ProfileUserData.vue';

export default {
  name: "user-profile",
  components: {
    ProfileCoverMediaMenu,
    ProfileCoverLoader,
    ProfileUserData,
  },
  data() {
    return {
      isAddCoverBtnClicked: false,
      isOverlayOpen: false,
      isLoading: false,
      isRepositioning: false,
      initialY: 0,
      yOffset: 0,
    };
  },
  computed: {
    ...mapGetters({
      profileCoverImg: "getProfileCoverImg",
      coverImgPosition: "getProfileCoverImgPosition",
    }),
    getCoverImgPosition() {
      return this.isRepositioning ? this.yOffset : this.coverImgPosition;
    },
  },
  methods: {
    addCover() {
      this.isAddCoverBtnClicked = !this.isAddCoverBtnClicked;
      this.isOverlayOpen = true;
    },
    closeMediaMenu() {
      this.isAddCoverBtnClicked = false;
      this.isOverlayOpen = false;
    },
    startReposition(e) {
      this.isRepositioning = true;
      this.initialY = e.clientY;
      this.$refs.coverImgWrapper.style.cursor = "move";
    },
    startDrag(e) {
      e.preventDefault();
      this.$refs.coverImgWrapper.style.cursor = "move !important";
    },
    handleDrag(e) {
      if (this.isRepositioning) {
        e.preventDefault();
        const rect = this.$refs.coverImgWrapper.getBoundingClientRect();
        const coverImgHeight = rect.height;
        const mouseY = e.clientY - rect.top;

        // Calculate the percentage offset based on the mouse position
        let newOffset = 100 - (mouseY / coverImgHeight) * 100;

        // Limit the offset value between 0 and 100
        newOffset = Math.min(Math.max(newOffset, 0), 100);

        console.log(newOffset);

        // Update the background position
        this.yOffset = newOffset;
      }
    },
    cancelReposition() {
      this.isRepositioning = false;
      this.$refs.coverImgWrapper.style.cursor = "inherit";
    },
    savePositioning() {
      const user = auth.currentUser;
      const usersRef = doc(db, "users", user.uid);
      updateDoc(usersRef, {
        profileCoverImgPosition: this.yOffset,
      })
        .then(() => {
          this.cancelReposition();
          console.log("profileCoverImg positioned succesfully");
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    handleLoading(loadingState) {
      this.isLoading = loadingState;
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  display: none;
  background-color: rgba(0, 0, 0, 0.1);
}

.profile {
  .profile-cover-img-wrapper {
    width: 100%;
    height: 20rem;
    background-color: #ccc;

    img {
      object-fit: cover;
      object-position: 50% 50%;
    }

    &:hover {
      .control-profile-cover-img {
        display: block !important;
      }
    }

    .control-profile-cover-img {
      bottom: 0.5rem;

      button {
        border: 0;
        outline: 0;
        background: none;
        background-color: #ededed;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: #fff;
          box-shadow: 0px 1px 7px 4px rgba(0, 0, 0, 0.1);
        }

        &:active {
          background-color: #ddd;
        }
      }
    }
  }
}
</style>