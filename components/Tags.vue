<template>
  <div class="tags">
    <h3 class="fw-300">Etiketler</h3>
    <hr />
    <div class="tags__list">
      <nuxt-link
        v-for="tag in tags"
        :key="tag.name"
        :to="`/search?tag=${tag.name}`"
      >
        #{{ tag.name }} <small>({{ tag.count }})</small>
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
interface Tag {
  name: string
  count: number
}
export default Vue.extend({
  props: {
    tags: {
      type: Array as () => Tag[],
      required: true
    }
  }
})
</script>
