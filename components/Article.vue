<template>
  <nuxt-link :to="`/article/${article.slug}`" class="articles-content-item">
    <div class="articles-content-item-image">
      <img :src="`/assets/articles/${article.slug}.jpg`" loading="lazy" onerror="this.style.visibility='hidden'" :alt="article.title">
    </div>
    <div class="articles-content-item-content">
      <h3 class="articles-content-item-content-title">{{ article.title }}</h3>
      <p class="articles-content-item-content-text">{{ article.description }}</p>
      <div class="articles-content-item-content-info">
        <div class="articles-content-item-content-info-space"></div>
        <div class="articles-content-item-content-info-item">
          <svg viewBox="0 0 512 512"><path fill="currentColor" d="M459.91 192.02c-.7 0-1.39.02-2.06.05-49.8 2.84-140.51 13-201.84 47.57-61.33-34.57-152.05-44.73-201.84-47.57-.67-.04-1.36-.05-2.06-.05C31.71 192.01 0 206.36 0 242.22v178.05c0 26.69 21.25 48.7 48.34 50.12 34.41 1.81 120.56 9.08 177 37.47 5.47 2.77 11.34 4.14 17.19 4.14h26.94c5.84 0 11.72-1.37 17.19-4.14 56.44-28.39 142.59-35.65 177-37.47 27.09-1.42 48.34-23.44 48.34-50.12V242.22c0-35.86-31.71-50.2-52.09-50.2zM232 458.43c-60.63-25.8-138.17-33.71-181.14-35.97-1.71-.09-2.86-1.21-2.86-2.19l-.46-178.45c.76-.76 3.29-1.74 3.88-1.84 35.86 2.04 125.09 10.18 180.58 41.26v177.19zm232-38.16c0 .98-1.15 2.1-2.87 2.19-42.94 2.26-120.43 10.16-181.13 35.98v-177.2c55.32-30.98 144.17-39.16 179.93-41.22 1.4.13 3.78 1.09 4.07 2.2v178.05zM256 191.99c53.02 0 96-42.98 96-95.99S309.02 0 256 0s-96 42.98-96 95.99 42.98 96 96 96zM256 48c26.47 0 48 21.53 48 48s-21.53 48-48 48-48-21.53-48-48 21.53-48 48-48z"></path></svg>
          <span v-text="getReadTime"></span>
        </div>
        <div class="articles-content-item-content-info-item">
          <svg viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"/></svg>
          <span v-text="getDate"></span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>


<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'
export default Vue.extend({
  props: {
    article: {
      type: Object as () => IContentDocument,
      required: true
    }
  },
  computed: {
    getReadTime() {
      return this.$calculateReadTime(JSON.stringify(this.article.body))
    },
    getDate() {
      return this.$moment(this.article.createdAt).fromNow()
    }
  }
})

</script>
