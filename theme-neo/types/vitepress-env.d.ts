/// <reference types="vite/client" />

// VitePress 构建时注入的全局常量
declare const __VP_HASH_MAP__: Record<string, string>
declare const __VP_LOCAL_SEARCH__: boolean
declare const __ALGOLIA__: boolean
declare const __CARBON__: boolean
declare const __ASSETS_DIR__: string
declare const __VUE_PROD_DEVTOOLS__: boolean

interface ImportMeta {
  hot?: {
    accept(path: string, cb: (m: any) => void): void
    accept(cb: (m: any) => void): void
  }
}

// Vue 组件模块声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

// VitePress 虚拟模块声明
declare module '@siteData' {
  import type { SiteData } from 'vitepress'
  const data: SiteData
  export default data
}

declare module '@theme/index' {
  import type { Theme } from 'vitepress'
  const theme: Theme
  export default theme
}

// 本地搜索索引模块声明
declare module '@localSearchIndex' {
  const data: Record<string, () => Promise<{ default: string }>>
  export default data
}

// mark.js 模块声明
declare module 'mark.js/src/vanilla.js' {
  import type Mark from 'mark.js'
  const mark: typeof Mark
  export default mark
}
