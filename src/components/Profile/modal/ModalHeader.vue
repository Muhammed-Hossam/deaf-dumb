<template>
  <div class="modal-header p-3 border-bottom d-flex justify-content-between align-items-center">
    <div class="h4" v-if="modalMode === 'default'">
      <span> Profile Photo </span>
    </div>
    <div class="h4" v-else-if="modalMode === 'edit'">
      <span role="button" class="return-icon me-2" @click="returnToDefaultMode">
        <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
      </span>
      <span> Edit Photo </span>
    </div>
    <div class="h4" v-else-if="modalMode === 'add'">
      <span role="button" class="return-icon me-2" @click="returnToDefaultMode">
        <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
      </span>
      <span> Add Photo </span>
    </div>
    <div class="close-icon" @click="closeModal">
      <font-awesome-icon icon="fa-regular fa-circle-xmark" size="xl" />
    </div>
  </div>
</template>



<script>
export default {
  emits: ['return-default', 'close-modal', 'close-camera'],
  props: ['modalMode', 'videoStream'],
  methods: {
    returnToDefaultMode() {
      this.$emit('return-default', 'default');
      this.$emit('close-camera')
      this.closeCamera();
    },
    closeModal() {
      this.$emit('close-modal', false);
    },
    closeCamera() {
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    },
  }
};
</script>


<style lang="scss" scoped>
.modal-header {
  .close-icon {
    transition: all 0.3s ease-in-out;

    &:hover {
      color: orangered;
      cursor: pointer;
    }
  }
}
</style>