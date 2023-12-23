<template>
  <div class="contents-document-container">
    <ClientOnly>
      <CommonMarkdown
        :path="$route.path"
        :type="type"
        :category="category"
        :title="title"
      ></CommonMarkdown>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const type = route.params.contentType as string
const category = route.params.category as string
const title = route.params.title as string
</script>

<style lang="scss" scoped>
.contents-document-container {
  height: 100%;
}
</style>
