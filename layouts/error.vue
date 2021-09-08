<template>
  <div>
    <div class="notfound-2">
      <h3>404: Böyle bir sayfa bulunamadı.</h3>
      <nuxt-link to="/" style="text-decoration: none;">Ana sayfaya geri dön.</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'blank',
  props: {
    error: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss">

.notfound-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95vh;
  a:hover {
    opacity: .4;
  }
}

</style>
