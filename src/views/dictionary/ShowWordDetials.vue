<template>
  <div>
    <WordDetials :word="word" :description="description" :innerImg="innerImg" />
  </div>
</template>


<script>
import WordDetials from '@/components/WordDetials.vue';

import { db } from '@/firebaseConfig';
import { doc, getDoc } from '@firebase/firestore';


export default {
  components: {
    WordDetials
  },
  data() {
    return {
        word: '',
        innerImg: '',
        description: ''
      
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

                // console.log(this.word, this.description)
              }
            })

          }
        })
      }
    }
  }
}
</script>