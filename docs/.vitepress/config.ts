import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VueUseBem',
  description: 'A simple BEM-style classnames generator for Vue.js 3',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/get-started' },
      { text: 'API', link: '/api' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Get started', link: '/get-started' },
          { text: 'Configuration', link: '/configuration' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Chrtyaka/vue-use-bem' },
    ],
  },
});
