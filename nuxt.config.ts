// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: '@nuxt-themes/typography',
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@nuxt/content',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: '//at.alicdn.com/t/c/font_4379482_78ayyr5kp6f.css',
        },
      ],
      script: [{ src: '//at.alicdn.com/t/c/font_4379482_78ayyr5kp6f.js' }],
    },
  },
  content: {
    documentDriven: true,
    markdown: {
      // anchorLinks: { depth: 4, exclude: [1] },
      // remarkPlugins: ['remark-gfm', ['remark-toc', { maxDepth: 2 }]],
      remarkPlugins: ['remark-gfm'],
      rehypePlugins: [
        'rehype-figure',
        // ['@jsdevtools/rehype-toc', rehypeTocOption],
      ],
      // toc: { depth: 4, searchDepth: 4 },
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
