<template>
  <div v-if="toc && toc.links && ids.length > 1" class="app-toc-container">
    <div v-for="link in links" :key="link.id" class="anchor-item">
      <NuxtLink
        :class="[
          'anchor-link',
          `anchor-depth-${link.depth - 1}`,
          { 'actived-anchor': link.id === activeId },
        ]"
        :to="`#${link.id}`"
        @click="setActive(link.id)"
      >
        {{ link.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActiveScroll } from 'vue-use-active-scroll'

const route = useRoute()
const pathArray = computed(() => route.path.split('/').filter(x => !!x))
const { data, refresh } = await useAsyncData(() =>
  queryContent(pathArray.value[0], ...pathArray.value.slice(1))
    .where({ _type: { $eq: 'markdown' } })
    .findOne(),
)
const toc = computed(() => data.value?.body?.toc)
const links = computed(() =>
  (toc.value ? toc.value.links : []).flatMap(item =>
    [item].concat(item.children || []),
  ),
)
const ids = computed(() => {
  const links = toc.value ? toc.value.links : []

  return links.flatMap(({ id = '', children = [] }) => [
    id,
    ...children.map(({ id }) => id),
  ])
})
const scrollOption = {
  jumpToFirst: true,
  boundaryOffset: { toTop: 60, toBottom: 60 },
}
const { setActive, activeId } = useActiveScroll(ids, scrollOption)

console.log(links)

watch(
  () => route.path,
  () => refresh(),
)
</script>

<style lang="scss" scoped>
.app-toc-container {
  .anchor-item {
    .anchor-link {
      position: relative;
      display: block;
      width: 100%;
      padding: 4px 0;
      padding-left: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;

      &.anchor-depth-2 {
        padding-left: 24px;
        font-weight: normal;
      }

      &:hover,
      &.actived-anchor {
        color: var(--el-menu-hover-text-color);
      }

      &.actived-anchor::before {
        content: '';
        position: absolute;
        left: 0;
        top: 4px;
        bottom: 4px;
        width: 2px;
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>
