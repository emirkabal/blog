<template>
  <div>
    <h2 class="fw-300">Son Gönderiler</h2>
    <div class="last-articles">
      <nuxt-link v-for="article in articles" :key="article.slug" :to="`/article/${article.slug}`" class="card">
        <div class="card-image">
          <img :src="`/assets/articles/${article.slug}.jpg`" loading="lazy" onerror="this.style.visibility='hidden'" :alt="article.title">
        </div>
        <div class="card-content">
          <h3>
            {{ article.title }}
          </h3>
          <p class="fw-300">
            {{  article.description }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content"
import Vue from 'vue'
export default Vue.extend({
  props: {
    articles: {
      type: Array as () => IContentDocument[],
      required: true
    }
  }
})
</script>
