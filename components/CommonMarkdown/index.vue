<template>
  <div class="common-markdown-component">
    <div v-if="currentPage" class="markdown-content">
      <ContentDoc>
        <template #not-found>
          <el-empty description="文章逃跑了~" />
        </template>
      </ContentDoc>
      <!-- <ContentRenderer :value="currentPage">
        <ProseH1 id="currentPage.title">{{ currentPage.title }}</ProseH1>
        <ContentRendererMarkdown :value="currentPage" />
      </ContentRenderer> -->

      <!-- 上下markdown -->
      <div class="markdown-prev_next-content">
        <div :class="{ 'is-visibility': prev }">
          <MarkdownStepNav
            v-if="prev"
            type="prev"
            :path="prev._path!"
            :title="prev.title!"
          ></MarkdownStepNav>
        </div>
        <div :class="{ 'is-visibility': next }">
          <MarkdownStepNav
            v-if="next"
            type="next"
            :path="next._path!"
            :title="next.title!"
          ></MarkdownStepNav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {}

const route = useRoute()
const pathArray = route.path
  .split('/')
  .filter(x => !!x)
  .slice(0, -1)
const { data: contents } = await useAsyncData(() =>
  queryContent(pathArray[0], ...pathArray.slice(1))
    .where({ _type: { $eq: 'markdown' } })
    .find(),
)
const currentIndex = computed(() =>
  contents.value?.findIndex(x => x._path === route.path),
)
const currentPage = computed(() => {
  if (!contents.value) return null
  if (currentIndex.value === undefined) return null

  return contents.value[currentIndex.value]
})
const prev = computed(() =>
  currentIndex.value === undefined
    ? undefined
    : contents.value![currentIndex.value - 1],
)
const next = computed(() =>
  currentIndex.value === undefined
    ? undefined
    : contents.value![currentIndex.value + 1],
)

// watch(currentPage, () => console.log(currentPage.value))
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
