import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $calculateReadTime(text: string): void
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $calculateReadTime(text: string): void
  }
  interface Context {
    $calculateReadTime(text: string): void
  }
}


const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200
  const words = text.split(' ')
  const minutes = Math.ceil(words.length / wordsPerMinute)
  return `${minutes} dakika`
}

const calculateReadTimePlugin: Plugin = (context, inject) => {
  inject('calculateReadTime', calculateReadTime)
  context.$calculateReadTime = calculateReadTime
}

export default calculateReadTimePlugin
