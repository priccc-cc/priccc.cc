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
          rel: 'icon',
          type: 'iamge/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'stylesheet',
          href: '//at.alicdn.com/t/c/font_4379482_36dhb1w7spm.css',
        },
      ],
      script: [{ src: '//at.alicdn.com/t/c/font_4379482_36dhb1w7spm.js' }],
    },
  },
  content: {
    experimental: {
      search: {
        indexed: true,
        options: {
          fields: ['title', 'content'],
          storeFields: ['title', 'content'],
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
          },
        },
      },
    },
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
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['css-doodle'].includes(tag),
    },
  },
})
