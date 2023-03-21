<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/KeQoGjfvl3k"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <div class="container">
      <h2 class="text-center mt-5 mb-2 fs-1 fw-bolder">English Signs Dictionary</h2>
      <div class="row">
          <LetterCard v-for="letter in letters" :key="letter" :link="`/dictionary/${letter}`" :letter="letter"/>
      </div>
    </div>
  </div>
</template>

<script>
import LetterCard from "@/components/LetterCard.vue";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

// import { db } from "@/firebaseConfig";
// import { collection, getDoc } from "@firebase/firestore";

export default {
  name: "dictionary-index",
  components: {
    LetterCard,
  },

  data() {
    return {
      letters: []
    };
  },
  methods: {
    async retrivedData() {
      const dictionaryRef = collection(db, "dictionary");
      const querySnapshot = await getDocs(dictionaryRef);
      const letters = []
      querySnapshot.forEach((doc) => {
        letters.push(doc.id);
      })
      this.letters = letters;
    }
  },
  async mounted() {
    await this.retrivedData();
  },
};
</script>
