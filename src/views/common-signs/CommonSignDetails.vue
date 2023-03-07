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
  props: ['word'],

  components: {
    WordDetials
  },

  data() {
    return {
      innerImg: '',
      description: ''
    };
  },
  watch: {
    word: {
      immediate: true,
      handler(newWord) {
        const signRef = doc(db, 'commonSigns', newWord);
        getDoc(signRef).then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            this.innerImg = data.innerImg;
            this.description = data.description;
          }else {
            console.log('No such document!')
          }
        })
        .catch((error) => {
          console.log('Error getting document: ', error)
        })
      }
    }
  }
}
</script>