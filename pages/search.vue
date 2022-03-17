<template>
  <div>
    <h2>Arama sonuçları</h2>
    <Articles
      style="margin-top: -42px"
      :articles="articles"
      :pages="-1"
      :per-page="15"
    />
    <div v-if="articles.length === 0" class="notfound">
      <h3>Aradığınız kriterlere göre bir sonuç bulunamadı.</h3>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { IContentDocument } from "@nuxt/content/types/content"

export default Vue.extend({
  data() {
    return {
      allArticles: [] as IContentDocument[],
      articles: [] as IContentDocument[],
      search: "" as string,
      tag: "" as string,
    }
  },

  async fetch() {
    const allArticles = await this.$content()
      .sortBy("createdAt", "desc")
      .only([
        "title",
        "description",
        "tags",
        "slug",
        "createdAt",
        "body",
        "content",
      ])
      .fetch()

    const search = this.query?.q?.toString() || undefined
    const tag = this.query?.tag?.toString() || undefined

    const articles: IContentDocument[] = allArticles
      .slice()
      .filter((article: IContentDocument) => {
        return (
          (search &&
            (article.title?.toLocaleLowerCase().indexOf(search) !== -1 ||
              article.description?.toLocaleLowerCase().indexOf(search) !==
                -1)) ||
          (tag &&
            article.tags?.join(", ").toLocaleLowerCase().indexOf(tag) !== -1)
        )
      })

    this.allArticles = allArticles
    this.articles = articles
    this.search = search
    this.tag = tag
  },

  head() {
    return {
      title: `${this.$data.search || this.$data.tag} aramasından sonuçlar`,
    }
  },

  watch: {
    $route(to) {
      if (to.query.q) this.search = to.query.q.trim()
      if (to.query.tag) this.tag = to.query.tag.trim()
      this.filterArticles()
    },
  },
  mounted() {
    if (this.$route.query.q) this.search = this.$route.query.q.trim()
    if (this.$route.query.tag) this.tag = this.$route.query.tag.trim()
    this.filterArticles()
  },
  methods: {
    filterArticles() {
      this.articles = this.$data.allArticles
        .slice()
        .filter((article: IContentDocument) => {
          return (
            (this.search &&
              (article.title?.toLocaleLowerCase().indexOf(this.search) !== -1 ||
                article.description
                  ?.toLocaleLowerCase()
                  .indexOf(this.search) !== -1)) ||
            (this.tag &&
              article.tags?.join(", ").toLocaleLowerCase().indexOf(this.tag) !==
                -1)
          )
        })
    },
  },
})
</script>
