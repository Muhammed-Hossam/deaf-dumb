<template>
  <LoadingSpinner v-if="isLoading" />
  <div>
    <WordDetials :word="word" :description="description" :innerImg="innerImg" />
  </div>
</template>


<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import WordDetials from '@/components/WordDetials.vue';

import { db } from '@/firebaseConfig';
import { doc, getDoc } from '@firebase/firestore';


export default {
  components: {
    WordDetials,
    LoadingSpinner
},
  data() {
    return {
        word: '',
        innerImg: '',
        description: '',
        isLoading: true
    };
  },

  mounted() {
    console.log(this.word, this.description)
  },

  watch: {
    $route: {
      immediate: true,
      handler: function(newRoute)  {
        const queryWord = newRoute.query.word;
        const newLetter = newRoute.params.letter;
        const dictionaryRef = doc(db, "dictionary", newLetter);
        getDoc(dictionaryRef).then((doc) => {
          if (doc.exists()) {
            const words = doc.data().words;
            words.forEach(sign => {
              if (sign.word === queryWord) {
                console.log(sign)
                
                this.word = sign.word;
                this.innerImg = sign.innerImg;
                this.description = sign.description;
                this.isLoading = false;
              }
            })

          }
        })
      }
    }
  }
}
</script>