import Vue from 'vue'
import type { VueDisqusOptions } from 'vue-disqus'
import VueDisqus from 'vue-disqus'

const options: VueDisqusOptions = {
  shortname: 'emirkabal'
}

Vue.use(VueDisqus, options)
