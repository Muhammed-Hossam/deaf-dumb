<template>
  <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="alertModalLabel">{{ title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ body }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ closeBtn }}</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="confirmModal">{{ confirmBtn }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['title', 'body', 'closeBtn', 'confirmBtn'],
  emits: ['is-confirm'],

  methods: {
    confirmModal() {
      this.$emit('is-confirm');
    }
  }
}
</script>


<style lang="scss">
.modal-backdrop {
  display: none;
}
</style>