<template>
  <div class="common-markdown-component">
    <div class="markdown-content">
      <ContentDoc>
        <template #not-found>
          <h1>Document not found</h1>
        </template>
      </ContentDoc>

      <!-- 上下markdown -->
      <div class="markdown-prev_next-content">
        <div :class="{ 'is-visibility': hasPrev }">
          <MarkdownStepNav
            v-if="hasPrev"
            type="prev"
            :path="prev._path"
            :title="prev.title"
          ></MarkdownStepNav>
        </div>
        <div :class="{ 'is-visibility': hasNext }">
          <MarkdownStepNav
            v-if="hasNext"
            type="next"
            :path="next._path"
            :title="next.title"
          ></MarkdownStepNav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {}

const { page, next, prev } = useContent()

const hasPrev = computed(
  () => prev.value && prev.value?._dir === page.value?._dir,
)
const hasNext = computed(
  () => next.value && next.value?._dir === page.value?._dir,
)
</script>

<style lang="scss" scoped>
.common-markdown-component {
  padding: 24px 0;

  .markdown-content {
    max-width: 680px;
    margin: 0 auto;

    .markdown-prev_next-content {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      padding-top: 40px;
      border-top: 1px solid var(--el-border-color);

      > div {
        flex: 1;
        visibility: hidden;
      }

      .is-visibility {
        visibility: visible;
      }
    }
  }
}
</style>
