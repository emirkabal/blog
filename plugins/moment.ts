import type { Moment } from "moment"
import { Plugin } from "@nuxt/types"
import moment from "moment"

declare module "vue/types/vue" {
  interface Vue {
    $moment(date: Date | string | undefined): Moment
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $moment(date: Date | string | undefined): Moment
  }
  interface Context {
    $moment(date: Date | string | undefined): Moment
  }
}

const momentFunction = (date: Date | string | undefined): Moment => {
  return moment(date).locale("tr")
}

const momentPlugin: Plugin = (context, inject) => {
  inject("moment", momentFunction)
  context.$moment = momentFunction
}

export default momentPlugin
