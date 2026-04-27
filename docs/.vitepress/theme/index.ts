import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { Collapse, PasswordProtected } from "@fcbyk/vitepress-ui"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Collapse', Collapse)
    app.component('PasswordProtected', PasswordProtected)
  }
} satisfies Theme
