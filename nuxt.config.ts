const rehypeTocOption = {
  customizeTOC: (toc: any) => {
    console.log(3333, toc)
    return 'Hello'
  },
  customizeTOCItem: (toc: any) => {
    console.log(4444, toc)
    return 'World'
  },
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@nuxt/content',
  ],
  devtools: { enabled: true },
  // css: ['assets/markdown/dark.css'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: '//at.alicdn.com/t/c/font_4379482_hiclj9vejne.css',
        },
      ],
      script: [{ src: '//at.alicdn.com/t/c/font_4379482_hiclj9vejne.js' }],
    },
  },
  content: {
    markdown: {
      // anchorLinks: { depth: 4, exclude: [1] },
      // remarkPlugins: ['remark-gfm', ['remark-toc', { maxDepth: 2 }]],
      remarkPlugins: ['remark-gfm'],
      rehypePlugins: [
        'rehype-figure',
        // ['@jsdevtools/rehype-toc', rehypeTocOption],
      ],
      // toc: { depth: , searchDepth: 4 },
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
