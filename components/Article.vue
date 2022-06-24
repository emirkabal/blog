<template>
  <nuxt-link :to="`/article/${article.slug}`" class="articles-content-item">
    <div class="articles-content-item-image">
      <img
        :src="`/assets/articles/${article.slug}.jpg`"
        loading="lazy"
        onerror="this.style.visibility='hidden'"
        :alt="article.title"
      />
    </div>
    <div class="articles-content-item-content">
      <h3 class="articles-content-item-content-title">{{ article.title }}</h3>
      <p class="articles-content-item-content-text">
        {{ article.description }}
      </p>
      <div class="articles-content-item-content-info">
        <div class="articles-content-item-content-info-space"></div>
        <div class="articles-content-item-content-info-item">
          <IconReadingBook />
          <span v-text="getReadTime"></span>
        </div>
        <div class="articles-content-item-content-info-item">
          <IconClock />
          <span v-text="getDate"></span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content"
import Vue from "vue"
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
