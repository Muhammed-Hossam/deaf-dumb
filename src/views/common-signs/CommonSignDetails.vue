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
  props: ['word'],

  components: {
    WordDetials,
    LoadingSpinner
},

  data() {
    return {
      innerImg: '',
      description: '',
      isLoading: true
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
            this.isLoading = false;
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