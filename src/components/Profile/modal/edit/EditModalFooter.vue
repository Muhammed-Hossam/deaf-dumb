<template>
  <div class="modal-footer border-top py-3">
    <button class="btn btn-success me-3 rounded-pill" @click="uploadCroppedPhoto">Save Photo</button>
  </div>
</template>


<script>
import { db, auth } from "@/firebaseConfig";
import { doc, updateDoc } from "@firebase/firestore";

export default {
  props: ['croppedImageURL'],
  emits: ['is-loading'],
  methods: {
    async uploadCroppedPhoto() {
      this.$emit('is-loading', true);
      const user = auth.currentUser;
      const userRef = doc(db, 'users', user.uid);

      await updateDoc(userRef, {
        croppedUserPhoto: this.croppedImageURL
      })
      .then(() => {
        console.log('userPhoto saved successfully');
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        this.$emit('is-loading', false);
      })
    }
  },
  watch: {
    croppedImageURL(newValue) {
      console.log('userPhoto: ', newValue);
    }
  }
}
</script>


<style lang="scss" scoped>

</style>