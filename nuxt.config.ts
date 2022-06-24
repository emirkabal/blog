import fs from "fs"
import { NuxtOptionsHead } from "@nuxt/types/config/head"
const desc =
  "Hello, I'm Emir Kabal and I'm a full-stack developer and making some Node.js applications and websites."

const sitemap = {
  hostname: "https://blog.emirkabal.com",
  gzip: true,
  routes: fs
    .readdirSync("./content/")
    .map((file) => `/article/${file.replace(".md", "")}`)
}

const head: NuxtOptionsHead = {
  titleTemplate: "%s - Emir Kabal Blog",
  title: "Emir Kabal Blog",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { hid: "description", name: "description", content: desc },
    {
      hid: "og:description",
      name: "og:description",
      property: "og:description",
      content: desc
    },
    {
      hid: "og:type",
      name: "og:type",
      property: "og:type",
      content: "website"
    },
    {
      hid: "og:site_name",
      name: "og:site_name",
      property: "og:site_name",
      content: "blog.emirkabal.com"
    },
    {
      hid: "og:image",
      name: "og:image",
      property: "og:image",
      content: "/logo.png"
    },
    {
      name: "theme-color",
      content: "#3892d0"
    },
    {
      hid: "twitter:card",
      property: "twitter:card",
      name: "twitter:card",
      content: "summary"
    },
    {
      hid: "twitter:site",
      property: "twitter:site",
      name: "twitter:site",
      content: "@emirkabal"
    },
    {
      hid: "twitter:creator",
      property: "twitter:creator",
      name: "twitter:creator",
      content: "@emirkabal"
    },
    {
      hid: "twitter:title",
      property: "twitter:title",
      name: "twitter:title",
      content: "Emir Kabal Blog"
    },
    {
      hid: "twitter:description",
      property: "twitter:description",
      name: "twitter:description",
      content: desc
    },
    {
      hid: "twitter:image",
      property: "twitter:image",
      name: "twitter:image",
      content: "/logo.png"
    }
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "search",
      type: "application/opensearchdescription+xml",
      title: "Emir Kabal Blog",
      href: "https://blog.emirkabal.com/opensearch.xml"
    }
  ]
}

export default {
  target: "static",
  generate: {
    fallback: true
  },
  head,
  css: ["@/assets/scss/index.scss"],
  plugins: [
    "@/plugins/disqus.ts",
    "@/plugins/calculateReadTime.ts",
    "@/plugins/moment.ts"
  ],

  components: true,
  buildModules: [
    "nuxt-vite",
    [
      "@nuxt/typescript-build",
      { typeCheck: false, ignoreNotFoundWarnings: true }
    ],
    "@nuxtjs/google-analytics"
  ],
  modules: [
    "@nuxt/content",
    "@nuxtjs/sitemap",
    [
      "@nuxtjs/google-adsense",
      {
        id: "ca-pub-4879579032863674",
        analyticsUacct: "UA-144173986-4",
        analyticsDomainName: "blog.emirkabal.com",
        pageLevelAds: true,
        overlayBottom: false,
        tag: "adsbygoogle"
      }
    ]
  ],

  vite: {
    ssr: true,
    experimentWarning: false
  },
  sitemap,
  googleAnalytics: {
    id: "UA-144173986-4"
  },
  content: {
    liveEdit: false,
    markdown: {
      remarkExternalLinks: {
        target: "_blank",
        rel: "noreferrer noopener"
      },
      remarkPlugins: [
        [
          "remark-autolink-headings",
          {
            behavior: "wrap"
          }
        ]
      ]
    }
  }
}
