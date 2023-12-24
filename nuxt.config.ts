// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: '@nuxt-themes/typography',
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: '//at.alicdn.com/t/c/font_4379482_3y4w4a5pr9k.css',
        },
      ],
      script: [{ src: '//at.alicdn.com/t/c/font_4379482_3y4w4a5pr9k.js' }],
    },
  },
  content: {
    documentDriven: true,
    markdown: {
      remarkPlugins: ['remark-gfm'],
      rehypePlugins: ['rehype-figure'],
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['javascript'],
    },
  },
})
