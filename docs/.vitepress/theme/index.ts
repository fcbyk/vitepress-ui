import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { CCollapse } from "@fcbyk/vitepress-ui"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('CCollapse', CCollapse)
  }
} satisfies Theme
