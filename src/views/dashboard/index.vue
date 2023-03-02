<template>
  <div class="container">
    <card-container>
      <h2 class="text-center">Add New Item</h2>
      <form @submit.prevent="">
        <div class="select-page">
          <h3>Select a page</h3>
          <div class="radios mt-3 d-flex justify-content-around">
            <div class="form-check" v-for="(page) in pageTypes" :key="page.value">
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
        <div v-if="selectedPageType === 'alphabets'" class="letters-inputs">
          <select name="letters" id="letters-select">
            <option v-for="letter in letters" :key="letter" :value="letter">{{ letter }}</option>
          </select>
        </div>
      </form>
    </card-container>
  </div>
</template>

<script>
import CardContainer from "@/components/CardContainer.vue";
import { mapActions } from "vuex";

export default {
  name: "admin-dashboard",
  components: {
    CardContainer,
  },
  data() {
    return {
      pageTypes: [
        { label: "Sign Language Alphabets", value: "alphabets" },
        { label: "Common Signs", value: "common-signs" },
        { label: "Signs Dictionary", value: "dictionary" },
        { label: "Flash Cards", value: "flash-cards" },
      ],
      letters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      selectedPageType: "",
      selectedLetter: "",
      form: {
        alphabets: { letter: "", signImage: "" },
        commonSigns: {
          word: "",
          previewImage: "",
          innerImage: "",
          description: "",
        },
        dictionary: {
          letter: "",
          word: "",
          previewImage: "",
          innerImage: "",
          description: "",
        },
        flashCards: { word: "", choosingSigns: [], correctSign: "" },
      },
    };
  },
  methods: {
    ...mapActions(["addPage"]),
    submitForm() {
      this.addPage(this.selectedPageType, this.form[this.selectedPageType]);
      this.selectedPageType = "";
      this.selectedLetter = "";
      this.form.alphabets.letter = "";
      this.form.alphabets.signImage = "";
      this.form.commonSigns.word = "";
      this.form.commonSigns.previewImage = "";
      this.form.commonSigns.innerImage = "";
      this.form.commonSigns.description = "";
      this.form.dictionary.word = "";
      this.form.dictionary.previewImage = "";
      this.form.dictionary.innerImage = "";
      this.form.dictionary.description = "";
      this.form.flashCards.word = "";
      this.form.flashCards.choosingSigns = [];
      this.form.flashCards.correctSign = "";
    },
    handleFileInput(e) {
      this.form.alphabets.signImage = e.target.file[0];
    },
  },
  mounted() {
    this.selectedPageType = this.pageTypes[0].value;
  }
};
</script>


<style lang="scss" scoped>
.select-page {
  .form-check {

  }
}
</style>