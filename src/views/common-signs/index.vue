<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="mt-8">
    <div class="container mt-5">
      <div class="row">
        <div class="col">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/cSb6zeDPjLY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <div class="container">
      <h2 class="text-center mt-5 mb-3 fs-1 fw-bolder">Common English Signs</h2>
      <div class="row">
        <WordCard
          v-for="sign in commonSigns"
          :key="sign.word"
          :link="`common-signs/${sign.word}`"
          :preview-img="sign.previewImg"
          :word="sign.word"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import WordCard from "@/components/WordCard.vue";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

export default {
  components: {
    WordCard,
    LoadingSpinner
},
  name: "common-signs-view",
  data() {
    return {
      commonSigns: [],
      isLoading: true
    };
  },

  methods: {
    async retrievedData() {
      const commonSignsRef = collection(db, "commonSigns");
      const querySnapshot = await getDocs(commonSignsRef);
      const commonSignsData = [];
      querySnapshot.forEach((doc) => {
        commonSignsData.push(doc.data());
      });
      this.commonSigns = commonSignsData;
      this.isLoading = false;
    },
  },
  async created() {
    await this.retrievedData();
  },
};
</script>
