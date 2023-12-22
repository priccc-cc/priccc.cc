<template>
  <div class="common-markdown-component">
    <div class="markdown-content">
      <ContentDoc>
        <template #not-found>
          <h1>Document not found</h1>
        </template>
      </ContentDoc>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  path: string
  type: string
  category: string
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  path: '',
  type: '',
  category: '',
  title: '',
})
const { path, type, category, title } = toRefs(props)
</script>

<style lang="scss" scoped>
.common-markdown-component {
  padding: 24px 0;

  .markdown-content {
    max-width: 680px;
    margin: 0 auto;
  }
}
</style>
