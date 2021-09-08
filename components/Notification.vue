<template>
  <div class="notify" :class="type">
    <div class="notify__content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'info'
    },
  }
})
</script>
