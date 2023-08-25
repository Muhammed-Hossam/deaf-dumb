<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="alphabet-page">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <iframe
            height="315"
            src="https://www.youtube.com/embed/NlhebzQCpKU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div class="col-6">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/8OtUpBDjDtc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <h2 class="text-center mt-5 mb-2 fs-1 fw-bolder">
      English Letters Signs
    </h2>
    <div class="container">
      <div class="row">
        <AlphabetCard
          v-for="letter in letters"
          :key="letter"
          :letter="letter.letter"
          :img-src="letter.signImage"
          @show-content="showContent"
        />
      </div>
    </div>
    <div class="container">
      <AlphabetCardContent
        :show="show"
        :letter="letter"
        :img-src="imgSrc"
        @close-content="closeContent"
      />
    </div>
  </div>
</template>

<script>
import AlphabetCard from "@/components/Alphabet/AlphabetCard.vue";
import AlphabetCardContent from "@/components/Alphabet/AlphabetCardContent.vue";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebaseConfig";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

export default {
  name: 'alphabet-view',
  components: {
    AlphabetCard,
    AlphabetCardContent,
    LoadingSpinner
},
  data() {
    return {
      letters: [],
      isLoading: true,
      show: false,
      letter: "",
      imgSrc: "",
    };
  },
  methods: {
    showContent(payload) {
      this.show = payload.show;
      this.letter = payload.letter;
      this.imgSrc = payload.imgSrc;
    },
    closeContent(payload) {
      this.show = payload;
    },
    async retrievedData() {
      const lettersRef = collection(db, "letters");
      const querySnapshot = await getDocs(lettersRef);
      const lettersData = [];
      querySnapshot.forEach((doc) => {
        lettersData.push(doc.data());
      });
      this.letters = lettersData;
      this.isLoading = false;
    },
  },
  async created() {
    await this.retrievedData();
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

.alphabet-page {
  margin-top: 8rem;

  iframe {
    width: 100%;
  }
}

</style>
