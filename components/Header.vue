<template>
  <div class="header">
    <!-- <a v-if="$nuxt.$route.path === '/'" href="https://emirkabal.com" class="header__brand">
          <h1>Emir Kabal <span class="fw-300">Blog</span></h1>
        </a> -->
    <nuxt-link to="/" class="header__brand">
      <h1>Emir Kabal <span class="fw-300">Blog</span></h1>
    </nuxt-link>
    <div class="header__menu">
      <div class="header__search">
        <input
          v-model="search"
          type="text"
          placeholder="Gönderi ara..."
          @keyup="onSearch"
        />
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="svg-inline--fa fa-search fa-w-16"
        >
          <path
            fill="currentColor"
            d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
            class=""
          ></path>
        </svg>
      </div>
      <!-- <button>dark mode</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  data() {
    return {
      search: this.$route.query.q || ""
    }
  },
  watch: {
    $route(to) {
      if (!to.query.q) this.search = ""
    }
  },
  methods: {
    onSearch() {
      this.$router.push({
        path: "/search",
        query: {
          q: this.search
        }
      })
    }
  }
})
</script>
