<template>
  <div class="">
    <div class="container">
      <card-container>
        <h2 class="text-center">Add New Item</h2>
        <div class="select-page">
          <h3>Select a page</h3>
          <div class="radios mt-3 d-flex justify-content-around mb-3">
            <div class="form-check" v-for="page in pageTypes" :key="page.value">
              <input
                class="form-check-input"
                type="radio"
                :id="page.value"
                :value="page.value"
                name="page"
                :checked="selectedPageType === page.value"
                v-model="selectedPageType"
              />
              <label class="form-check-label" :for="page.value">
                {{ page.label }}
              </label>
            </div>
          </div>
        </div>
        <div class="forms">
          <div v-if="selectedPageType === 'alphabets'" class="letters-inputs">
            <LettersForm />
          </div>
          <div
            v-if="selectedPageType === 'common-signs'" class="common-signs-inputs">
            <CommonSignForm />
          </div>
          <div v-if="selectedPageType === 'dictionary'">
            <DictionaryForm />
          </div>
          <div v-if="selectedPageType === 'flash-cards'">
            <FlashCardForm />
          </div>
        </div>
      </card-container>
    </div>
  </div>
</template>

<script>
import CardContainer from "@/components/common/CardContainer.vue";
import LettersForm from "./Forms/LettersForm.vue";
import CommonSignForm from "./Forms/CommonSignForm.vue";
import DictionaryForm from "./Forms/DictionaryForm.vue";
import FlashCardForm from "./Forms/FlashCardForm.vue";

export default {
  name: "add-new-item",
  components: {
    CardContainer,
    LettersForm,
    CommonSignForm,
    DictionaryForm,
    FlashCardForm,
  },
  data() {
    return {
      pageTypes: [
        { label: "Sign Language Alphabets", value: "alphabets" },
        { label: "Common Signs", value: "common-signs" },
        { label: "Signs Dictionary", value: "dictionary" },
        { label: "Flash Cards", value: "flash-cards" },
      ],
      selectedPageType: "",
      selectedLetter: "",
    };
  },
  mounted() {
    this.selectedPageType = this.pageTypes[0].value;
  },
};
</script>
