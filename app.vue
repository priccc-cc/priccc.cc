<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@/assets/global.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

useSeoMeta({ ogImage: '/og-image.png' })
</script>
