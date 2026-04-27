import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { Collapse, PasswordProtected, CodePreview } from "@fcbyk/vitepress-ui"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Collapse', Collapse)
    app.component('PasswordProtected', PasswordProtected)
    app.component('CodePreview', CodePreview)
  }
} satisfies Theme
