<template>
  <div>
    <div class="articles">
      <div class="articles-content">
        <Article v-for="article in articles.slice(0, perPage)" :key="article.slug" :article="article"/>
      </div>
    </div>
    <div v-if="pages>1 && pages !== -1" ref="pagination" class="articles-pagination">
      <button
        v-for="i in pages"
        :key="i" class="articles-pagination-item"
        :class="page === i-1 && 'active'"
        :disabled="page === i-1"
        @click="changePage(i-1)
      ">
        {{ i }}
      </button>
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
    },
    page: {
      type: Number,
      default: 0,
      required: false
    },
    pages: {
      type: Number,
      default: 0,
      required: false
    },
    perPage: {
      type: Number,
      default: 5,
      required: false
    }
  },
  methods: {
    changePage(page: number) {
      this.$root.$emit('articles:changePage', page)
      this.$nuxt.$nextTick(() => {
        const el = this.$refs.pagination as HTMLElement
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
  }

})
</script>
