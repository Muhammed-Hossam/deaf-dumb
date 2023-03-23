<template>
  <div class="mt-8 mt-down-lg-12">
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
            <AddLetter />
          </div>
          <div
            v-if="selectedPageType === 'common-signs'"  class="common-signs-inputs">
            <AddCommonSign  />
          </div>
          <div v-if="selectedPageType === 'dictionary'">
            <AddToDictionary />
          </div>
          <div v-if="selectedPageType === 'flash-cards'">
            <AddFlashCard  />
          </div>
        </div>
      </card-container>
    </div>
  </div>
</template>

<script>
import CardContainer from "@/components/CardContainer.vue";
import AddLetter from "./AddLetter.vue";
import AddCommonSign from "./AddCommonSign.vue";
import AddToDictionary from "./AddToDictionary.vue";
import AddFlashCard from "./AddFlashCard.vue";


export default {
  name: "admin-dashboard",
  components: {
    CardContainer,
    AddLetter,
    AddCommonSign,
    AddToDictionary,
    AddFlashCard,
  },
  data() {
    return {
      isLoading: false,
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
  computed: {
    
  },
  methods: {
  },
  mounted() {
    this.selectedPageType = this.pageTypes[0].value;
  },
};
</script>
