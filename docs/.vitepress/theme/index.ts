import type { Theme } from 'vitepress'
import { 
  Collapse, 
  PasswordProtected,
  CodePreview,
  NeoTheme
} from "@fcbyk/vitepress-ui"

export default {
  ...NeoTheme,
  enhanceApp({ app }) {
    // 先调用 NeoTheme 的 enhanceApp（如果有的话）
    NeoTheme.enhanceApp?.({ app })
    
    // 再注册自定义组件
    app.component('Collapse', Collapse)
    app.component('PasswordProtected', PasswordProtected)
    app.component('CodePreview', CodePreview)
  }
} satisfies Theme