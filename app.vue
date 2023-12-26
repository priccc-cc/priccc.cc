<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@/assets/global.scss'

useSeoMeta({ ogImage: '/og-image.png' })
</script>
