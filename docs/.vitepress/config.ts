import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'VP-UI',
  description: 'A custom theme and reusable components for VitePress.',
  
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: '基础组件',
          items: [
            { text: 'Collapse 折叠面板', link: '/components/collapse' },
            { text: 'PasswordPrompt 密码验证', link: '/components/password-protected' }
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fcbyk/vitepress-ui' }
    ],

    search: {
      provider: 'local'
    }
  },

  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src'),
        '@fcbyk/vitepress-ui': resolve(__dirname, '../../src/index.ts')
      }
    }
  },
})
