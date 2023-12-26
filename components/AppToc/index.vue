<template>
  <div v-if="toc && toc.links && ids.length > 1" class="app-toc-container">
    <div v-for="item in toc.links" class="anchor-item item-level-1">
      <NuxtLink
        :class="['anchor-link', { 'actived-anchor': item.id === activeId }]"
        :to="`#${item.id}`"
        @click="setActive(item.id)"
      >
        {{ item.text }}
      </NuxtLink>

      <div
        v-if="item.children"
        v-for="sub in item.children"
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

const { toc }: { toc: Ref } = useContent()

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
