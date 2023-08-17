<template>
  <div class="modal-footer justify-content-between border-top">
    <div class="add__edit ms-3">
      <div role="button" v-if="fullUserPhoto" @click="actionMode('edit')" class="edit-btn d-inline-block py-4 px-3 me-3 rounded">
        <span class="icon d-block text-center">
          <font-awesome-icon icon="fa-solid fa-pencil" size="xl" />
        </span>
        <span class="fs-6 fw-bold">Edit</span>
      </div>
      <div role="button" @click="actionMode('add')" class="Add-btn d-inline-block py-4 px-3 rounded">
        <span class="icon d-block text-center">
          <font-awesome-icon icon="fa-solid fa-camera-retro" size="xl" />
        </span>
        <span class="fs-6 fw-bold">Add Photo</span>
      </div>
    </div>
    <div class="remove me-3" v-if="fullUserPhoto">
      <div role="button" class="remove-btn d-inline-block py-4 px-3 rounded" data-bs-toggle="modal" data-bs-target="#alertModal">
        <span class="icon d-block text-center">
          <font-awesome-icon icon="fa-regular fa-trash-can" size="xl" />
        </span>
        <span class="fs-6 fw-bold">Remove</span>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  emits: ['action-mode'],
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      fullUserPhoto: "getFullUserPhoto",
    })
  },
  methods: {
    actionMode(action) {
      this.$emit('action-mode', action);
    },
  }
}
</script>


<style lang="scss" scoped>
.modal-footer {
  .add__edit,
  .remove {
    div[role='button'] {
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #ddd;
      }

      &:active {
        background-color: #ccc;
        outline: 1px solid #555;
      }
    }
  }

  .remove {
    div:hover {
      color: orangered;
    }
  }
}
</style>