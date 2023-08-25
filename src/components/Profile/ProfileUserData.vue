<template>
  <Teleport to="body">
    <overlay :show="showModal" @click="closeUserPhotoModal(false)" />
  </Teleport>
  <div class="profile-user-data">
    <div
      class="profile-user-photo position-absolute d-inline-flex flex-column align-items-center gap-2"
    >
      <div
        role="button"
        class="user-photo-wrapper rounded-circle"
        @click="showUserPhotoModal"
      >
        <img :src="userPhoto" class="w-100 h-100 rounded-circle" alt="" />
      </div>
      <div class="username mb-2 text-center">
        <span v-if="!isUserNameEditable" class="name fs-4 me-3 fw-bold">{{ userName }}</span>
        <input
          v-else
          type="text"
          v-model="updatedUserName"
          placeholder="Type your Username"
          @keypress.enter="saveUserName"
          class="username-input border-top-0 border-start-0 border-end-0 fs-4 fw-bold text-center"
        />
        <span
          v-if="!isUserNameEditable"
          role="button"
          class="edit-btn d-none rounded-circle text-primary-emphasis text-center position-absolute"
          @click="editUserName"
        >
          <font-awesome-icon icon="fa-solid fa-pen" size="lg" />
        </span>
        <span
          v-else
          role="button"
          class="save-btn ms-3 text-success d-inline-block rounded-circle text-center"
          @click="saveUserName"
        >
          <font-awesome-icon icon="fa-solid fa-check" size="lg" />
        </span>
        <span
          v-if="isUserNameEditable"
          role="button"
          class="close-btn ms-3 text-danger d-inline-block rounded-circle text-center"
          @click="closeEditUserName"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" size="lg" />
        </span>
      </div>
    </div>
    <profileUserPhotoModal
      v-if="showModal"
      @close-modal="closeUserPhotoModal"
    />
  </div>
</template>


<script>
import Overlay from "../common/Overlay.vue";
import ProfileUserPhotoModal from "./modal/ProfileUserPhotoModal.vue";

import { mapGetters } from "vuex";
import { db, auth } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';


export default {
  components: {
    ProfileUserPhotoModal,
    Overlay,
  },
  data() {
    return {
      showModal: false,
      isUserNameEditable: false,
      updatedUserName: this.$store.state.userName,
    };
  },
  computed: {
    ...mapGetters({
      userPhoto: "getCroppedUserPhoto",
      userName: "getUserName",
    }),
  },
  methods: {
    showUserPhotoModal() {
      this.showModal = true;
    },
    closeUserPhotoModal(value) {
      this.showModal = value;
    },
    editUserName() {
      this.isUserNameEditable = true;
    },
    saveUserName() {
      if (this.updatedUserName) {
        const user = auth.currentUser;
        const userRef = doc(db, 'users', user.uid);
        updateDoc(userRef, {
          userName: this.updatedUserName
        })
        .then(() => {
          this.isUserNameEditable = false;
          console.log('userName is updated...');
        })
        .catch((error) => {
          console.error(error.message);
        })
      }
    },
    closeEditUserName() {
      this.isUserNameEditable = false;
    }
  },
};
</script>


<style lang="scss" scoped>
@import "../../scss/custom.scss";

.profile-user-data {
  height: 9rem;
  background-color: #ededed;
  .profile-user-photo {
    width: 32rem;
    top: 17rem;
    // left: 5rem;

    .user-photo-wrapper {
      width: 12rem;
      height: 12rem;
      background-color: #ccc;
      border: 3px solid #ccc;
    }
    .username {
      .name {
        color: $main-color;
      }
      .username-input {
        width: 14rem;
        background: none;
        outline: none;
        color: $main-color;

        &::placeholder {
          color: #999;
          font-size: 1.2rem;
        }
      }

      &:hover {
        .edit-btn {
          display: inline-block !important;
        }
      }

      .edit-btn,
      .save-btn,
      .close-btn {
        width: 2.2rem;
        height: 2.2rem;
        line-height: 2.2rem;
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: #ddd;
        }

        &:active {
          background-color: #ccc;
        }
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .profile-user-photo {
    width: 100% !important;
  }
}
</style>