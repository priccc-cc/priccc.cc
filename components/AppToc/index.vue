<template>
  <div v-if="toc && toc.links && ids.length > 1" class="app-toc-container">
    <div v-for="link in toc.links" class="anchor-item item-level-1">
      <NuxtLink
        :class="['anchor-link', { 'actived-anchor': link.id === activeId }]"
        :to="`#${link.id}`"
        @click="setActive(link.id)"
      >
        {{ link.text }}
      </NuxtLink>

      <div
        v-if="link.children"
        v-for="sub in link.children"
        class="anchor-item item-level-2"
      >
        <NuxtLink
          :class="['anchor-link', { 'actived-anchor': sub.id === activeId }]"
          :to="`#${sub.id}`"
          @click="setActive(sub.id)"
        >
          {{ sub.text }}
        </NuxtLink>
      </div>
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

watch(
  () => route.path,
  () => refresh(),
)
</script>

<style lang="scss" scoped>
.app-toc-container {
  .anchor-item {
    .anchor-link {
      display: block;
      width: 100%;
      padding: 4px 0;
      padding-left: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      cursor: pointer;

      &:hover,
      &.actived-anchor {
        color: var(--el-menu-hover-text-color);
      }
    }

    &.item-level-1 {
      > .anchor-link {
        font-weight: bold;
      }
    }

    &.item-level-2 {
      > .anchor-link {
        padding-left: 24px;
      }
    }
  }
}
</style>
