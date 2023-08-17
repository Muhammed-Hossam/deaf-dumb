<template>
  <div>
    <input
      v-model="search"
      type="text"
      @input="searchPhotos"
      class="form-control form-control-sm"
      placeholder="search for an image..."
    />
    <div class="unsplash-result mt-3">
      <UnsplashSearchLoadingSpinner v-if="isLoading" />
      <p v-if="photos.length === 0" class="text-center mb-0 text-secondary" >No Results Found!</p>
      <div class="container">
        <div class="row">
          <div class="unspalsh-photo col-3 px-1" v-for="photo in photos" :key="photo.id">
            <div role="button" class="w-100" style="height: 4rem" @click="getChoosenPhotoURL(photo.urls.full)">
              <img :src="photo.urls.thumb" class="w-100 h-100 rounded" alt="">
            </div>
            <p class="photographer text-secondary mt-1">
              Photo by <a :href="`https://unsplash.com/@${photo.user.username}?utm_source=your_app_name&utm_medium=referral`" target="_blank" class="text-secondary">{{ photo.user.name }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

import UnsplashSearchLoadingSpinner from './UnsplashSearchLoadingSpinner.vue';

export default {
  components: {
    UnsplashSearchLoadingSpinner
  },
  emits: ['choosen-photo-url'],
  data() {
    return {
      search: '',
      photos: [],
      isLoading: false,
      clientId: process.env.VUE_APP_UNSPLASH_ACCESS_KEY
    }
  },
  methods: {
    async loadCollection() {
      this.isLoading = true;
      const apiURL = 'https://api.unsplash.com/photos';
          try {
        const response = await axios.get(apiURL, {
        headers: {
          Authorization: `Client-ID ${this.clientId}`,
        },
        params: {
          per_page: 30, // Change this to the number of photos you want to fetch
        },
      });
      this.photos = response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      this.isLoading = false;
    }
    },
    async searchPhotos() {
      if (this.search === "") {
        this.loadCollection();
      }else {
        try {
          this.isLoading = true;
          const apiURL = 'https://api.unsplash.com/search/photos';
          const response = await axios.get(apiURL, {
            headers: {
              Authorization: `Client-ID ${this.clientId}`
            },
            params: {
              query: this.search,
              per_page: 30,
            }
          })
          this.photos = response.data.results;
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    getChoosenPhotoURL(url) {
      this.$emit('choosen-photo-url', url);
    }
  },
  created() {
    this.loadCollection();
  },
}
</script>

<style lang="scss" scoped>
.unsplash-result {
  .photographer {
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      transition: all 0.3s ease-in-out;

      &:hover {
        color: orangered !important;
      }
    }
  }
}
</style>