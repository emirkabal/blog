<template>
  <div class="article-content">
    <div class="article-head">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <div class="article-head-info">
        <div class="article-head-info-content">
          <span><IconClock /> {{ date }}</span>
          <span><IconReadingBook /> {{ readingTime }}</span>
        </div>
        <span class="article-head-info-space"></span>
        <ArticleShareButtons v-if="screenWidth > 768" :article="article" />
      </div>
      <ArticleShareButtons v-if="screenWidth <= 768" :article="article" />
    </div>
    <adsbygoogle
      v-if="screenWidth < 768 && showAds"
      ad-format="static"
      :ad-style="{
        display: 'inline-block',
        width: '100%',
        height: '140px',
        marginTop: '10px',
        marginTop: '10px'
      }"
    ></adsbygoogle>
    <nuxt-content :document="article" />
    <div class="article-tags">
      <div class="article-tags-content">
        <span
          v-text="article.tags.length > 1 ? 'Etiketler: ' : 'Etiket: '"
        ></span>
        <nuxt-link
          v-for="(tag, i) in article.tags"
          :key="i"
          :to="'/search?tag=' + tag"
          class="article-tags-content-tag"
          >{{ tag }}
        </nuxt-link>
      </div>
    </div>
    <adsbygoogle
      v-if="screenWidth >= 768 && showAds"
      ad-format="static"
      :ad-style="{
        display: 'inline-block',
        width: '100%',
        height: '140px',
        marginTop: '10px'
      }"
    ></adsbygoogle>
    <div class="article-comments">
      <Disqus />
    </div>
  </div>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content"
import Vue from "vue"
export default Vue.extend({
  async asyncData({ $content, $moment, $calculateReadTime, params, error }) {
    try {
      const slug: string = params.slug
      const article = (await $content(slug).fetch()) as IContentDocument

      return {
        article,
        date: $moment(article.createdAt).format("lll"),
        readingTime: $calculateReadTime(JSON.stringify(article.body)),
        screenWidth: 768
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: "Article not found"
      })
    }
  },
  data() {
    return {
      screenWidth: 768,
      showAds: false
    }
  },
  head() {
    return {
      title: this.$data.article.title,
      meta: [
        {
          hid: "description",
          property: "description",
          name: "description",
          content: this.$data.article.description
        },
        {
          hid: "og:title",
          property: "og:title",
          name: "og:title",
          content: this.$data.article.title
        },
        {
          hid: "og:description",
          property: "og:description",
          name: "og:description",
          content: this.$data.article.description
        },
        {
          hid: "og:image",
          property: "og:image",
          name: "og:image",
          content: `https://blog.emirkabal.com/assets/articles/${this.$data.article.slug}.jpg`
        },
        {
          hid: "og:url",
          property: "og:url",
          name: "og:url",
          content: `https://blog.emirkabal.com/articles/${this.$data.article.slug}`
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          name: "twitter:title",
          content: this.$data.article.title
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          name: "twitter:description",
          content: this.$data.article.description
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          name: "twitter:image",
          content: `https://blog.emirkabal.com/assets/articles/${this.$data.article.slug}.jpg`
        },
        {
          hid: "twitter:url",
          property: "twitter:url",
          name: "twitter:url",
          content: `https://blog.emirkabal.com/articles/${this.$data.article.slug}`
        }
      ]
    }
  },
  beforeMount() {
    window.addEventListener("resize", () => {
      this.handleResize()
    })
  },
  mounted() {
    this.handleResize()
    setTimeout(() => {
      this.showAds = true
    }, 1800)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize)
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth
    }
  }
})
</script>
