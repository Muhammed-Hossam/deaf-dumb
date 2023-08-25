<template>
  <div class="favorites my-5">
      <div class="favorites-heading h1 mx-3 my-5 fw-bold">Favorites</div>
      <div class="container">
        <div class="row">
          <AlphabetFavorites />
          <CommonSignsFavorites />
          <DictionaryFavorites />
          <FlashCardsFavorites />
        </div>
      </div>
  </div>
</template>


<script>
import AlphabetFavorites from './AlphabetFavorites.vue';
import CommonSignsFavorites from './CommonSignsFavorites.vue';
import DictionaryFavorites from './DictionaryFavorites.vue';
import FlashCardsFavorites from './FlashCardsFavorites.vue';


export default {
  components: {
    AlphabetFavorites,
    CommonSignsFavorites,
    DictionaryFavorites,
    FlashCardsFavorites
  },
  methods: {
    
  },
  
}
</script>


<style lang="scss" scoped>
.favorites {
  .favorites-heading {
    color: orangered;
    border-bottom: 3px solid;
  }
}
</style>