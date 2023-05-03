<template>
  <LoadingSpinner v-if="isLoading" />
  <div>
    <div class="container">
      <div class="row">
        <div class="col">

        </div>
      </div>
    </div>
    <div class="container">
      <h2 class="text-center mt-5 mb-3 fs-1 fw-bolder">Words that start with {{ letter }}</h2>
      <div class="row">
        <WordCard v-for="sign in dictionary" :key="sign.word" :link="`/dictionary/${letter}/details?word=${sign.word}`" :word="sign.word" :previewImg="sign.previewImg" />
      </div>
      <h3 v-if="notFoundMessage" class="text-center my-5 text-body-tertiary fw-bold">{{ notFoundMessage }}</h3>
    </div>
  </div>
</template>


<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import WordCard from '@/components/WordCard.vue';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from '@firebase/firestore';

export default {
  name: 'dictionary-show',
  props: ['letter'],
  components: {
    WordCard,
    LoadingSpinner
},

  data() {
    return {
      dictionary: [],
      isLoading: true,
      notFoundMessage: ''
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
            if (words.length === 0) {
              this.isLoading = false;
              this.notFoundMessage = `There are no words yet! Please Upload the words that begins by ${newLetter} letter`;
            }
            words.forEach(word => {
              this.dictionary.push(word);
              this.isLoading = false;
            })
          }
        })
      }
    },
  }
}
</script>