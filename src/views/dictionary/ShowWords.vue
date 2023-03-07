<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">

        </div>
      </div>
    </div>
    <div class="container">
      <h2 class="text-center mt-5 mb-3 fs-1 fw-bolder">Words that start with {{ letter }}</h2>
      <div class="d-flex justify-content-between flex-wrap" style="gap: 3rem">
        <WordCard v-for="sign in dictionary" :key="sign.word" :link="`/dictionary/${letter}/details?word=${sign.word}`" :word="sign.word" :previewImg="sign.previewImg" />
      </div>
    </div>
  </div>
</template>


<script>
import WordCard from '@/components/WordCard.vue';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from '@firebase/firestore';

export default {
  name: 'dictionary-show',
  props: ['letter'],
  components: {
    WordCard
  },

  data() {
    return {
      dictionary: []
    };
  },

  mounted() {
    console.log(this.letter);
    console.log(this.$route);
  },
  watch: {
    letter: {
      immediate: true,
      handler(newLetter) {
        const dictionaryRef = doc(db, "dictionary", newLetter);
        getDoc(dictionaryRef).then((doc) => {
          if (doc.exists()) {
            const words = doc.data().words;
            words.forEach(word => {
              this.dictionary.push(word);
            })
          }
        })
        console.log(this.dictionary)
      }
    }
  }
}
</script>