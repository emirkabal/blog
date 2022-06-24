declare module "@nuxt/content/types/content" {
  interface IContentDocument {
    dir?: string
    path?: string
    extension?: ".md" | ".json" | ".yaml" | ".xml" | ".csv" | string
    slug?: string
    title?: string
    toc?: Toc[]
    body?: Body
    description?: string
    createdAt?: Date
    updatedAt?: Date
    tags?: string[]
  }
}

interface Body {
  type?: string
  children?: Child[]
}

interface Child {
  type?: string
  value?: string
  tag?: string
  props?: Props
  children?: Child[]
}

interface Props {
  href?: string
  className?: string[]
  id?: string
}

interface Toc {
  id?: string
  depth?: number
  text?: string
}
