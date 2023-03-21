<template>
  <div class="position-relative">
    <div class="container">
      <div class="row mt-5">
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
    <div class="container">
      <h2 class="text-center mt-5 mb-2 fs-1 fw-bolder">
        English Letters Signs
      </h2>
      <div class="row">
        <AlphabetCard
          v-for="letter in letters"
          :key="letter"
          :letter="letter.letter"
          :img-src="letter.signImage"
          @show-content="showContent"
          @show-letter="showLetter"
          @show-img-src="showImg"
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
import AlphabetCard from "@/components/AlphabetCard.vue";
import AlphabetCardContent from "@/components/AlphabetCardContent.vue";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "@/firebaseConfig";

export default {
  components: {
    AlphabetCard,
    AlphabetCardContent,
  },
  data() {
    return {
      letters: [],
      show: false,
      letter: "",
      imgSrc: "",
    };
  },
  methods: {
    showContent(payload) {
      this.show = payload;
    },
    closeContent(payload) {
      this.show = payload;
    },
    showLetter(payload) {
      this.letter = payload;
    },
    showImg(payload) {
      this.imgSrc = payload;
    },

    async retrievedData() {
      const lettersRef = collection(db, "letters");
      const querySnapshot = await getDocs(lettersRef);
      const lettersData = [];
      querySnapshot.forEach((doc) => {
        lettersData.push(doc.data());
      });
      this.letters = lettersData;
    },
  },
  async created() {
    await this.retrievedData();
  },
  watch: {
    letters: {
      immediate: true,
      handler(newVal) {
        console.log(newVal);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
}
</style>
