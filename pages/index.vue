<template>
  <div>
    <LastArticles :articles="lastArticles" />
    <Tags v-if="screenWidth <= 768" :tags="tags" />
    <div class="my-flex">
      <h2>Gönderiler</h2>
      <Articles :articles="articles" :page="page" :pages="pages" :per-page="perPage" />
      <Tags v-if="screenWidth > 768" :tags="tags" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'
import LastArticles from '@/components/LastArticles.vue'
import Articles from '@/components/Articles.vue'
const perPage = 5

export default Vue.extend({
  components: { LastArticles, Articles },
  async asyncData({$content}) {
    const lastArticles = await $content()
      .sortBy('createdAt', 'desc')
      .only(['title', 'description', 'slug', 'createdAt'])
      .limit(3)
      .fetch()

    const articles = await $content()
      .sortBy('createdAt', 'desc')
      .only(['title', 'description', 'slug', 'createdAt', 'body', 'content'])
      .skip(3)
      .fetch()

    const pages = (await $content()
      .skip(3)
      .fetch()).length

    const tags = Object.entries((
      await $content()
        .sortBy('createdAt', 'desc')
        .only(['tags'])
        .fetch()
      )
      .map((e: {tags: string[]}) => e.tags).flat()
      .reduce((acc: { [key: string]: any }, val: number) => ({
        ...acc,
        [val]: (acc[val] || 0) + 1
      }), {})
    ).map((e) => {
      return {
        name: e[0],
        count: e[1]
      }
    })

    return {
      lastArticles,
      articles,
      tags,
      page: 0,
      pages: Math.ceil(pages / perPage),
      perPage,
      screenWidth: 769
    }
  },
  data() {
    return {
      lastArticles: [] as IContentDocument[],
      articles: [] as IContentDocument[],
      tags: [] as { name: string, count: number }[],
      articlesForPagination: [] as IContentDocument[],
      pages: Number,
      perPage: Number,
      page: 0,
      screenWidth: process.client ? window.innerWidth : 0
    }
  },
  head() {
    return {
      titleTemplate: '%s',
      title: 'Emir Kabal Blog'
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize)
  },
  mounted() {
    this.handleResize()
    this.articlesForPagination = this.articles.slice()
    this.$root.$on('articles:changePage', (e:number) => {
      this.changePage(e)
    })
  },
  methods: {
    async getArticles(limit=0, skip=0) {
      return (await this.$content()
        .sortBy('createdAt', 'desc')
        .only(['title', 'description', 'slug', 'createdAt', 'body', 'content'])
        .skip(3 + skip)
        .limit(limit)
        .fetch()) as Array<IContentDocument>
    },
    handleResize() {
      this.screenWidth = window.innerWidth
    },
    changePage(page: number) {
      this.page = page
      this.articles = this.articlesForPagination.slice(
        page * perPage,
        (page * perPage) + perPage
      )
    }
  }
})
</script>
