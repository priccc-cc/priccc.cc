<template>
  <div class="app-toc-container">
    <div v-for="item in toc.links" class="anchor-item item-level-1">
      <NuxtLink
        :class="['anchor-text', { 'actived-anchor': item.id === activeId }]"
        :to="`#${item.id}`"
        @click="setActive(item.id)"
      >
        <span>{{ item.text }}</span>
      </NuxtLink>

      <div
        v-if="item.children"
        v-for="sub in item.children"
        class="anchor-item item-level-2"
      >
        <NuxtLink
          :class="['anchor-text', { 'actived-anchor': sub.id === activeId }]"
          :to="`#${sub.id}`"
          @click="setActive(sub.id)"
        >
          <span>{{ sub.text }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActiveScroll } from 'vue-use-active-scroll'

const { toc } = useContent()
const ids = computed(() =>
  toc.value.links.flatMap(({ id = '', children = [] }) => [
    id,
    ...children.map(({ id }) => id),
  ]),
)
const scrollOption = {
  jumpToFirst: true,
  boundaryOffset: { toTop: 60, toBottom: 60 },
}
const { setActive, activeId } = useActiveScroll(ids, scrollOption)
</script>

<style lang="scss" scoped>
.app-toc-container {
  padding-top: 14px;

  .anchor-item {
    > .anchor-text {
      padding: 4px 12px;
      font-size: 12px;
      cursor: pointer;

      & span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:hover,
      &.actived-anchor {
        color: var(--el-menu-hover-text-color);
        // background-color: var(--el-menu-hover-bg-color);
        border-radius: 4px;
      }
    }

    &.item-level-1 {
      > .anchor-text {
        font-weight: bold;
      }
    }

    &.item-level-2 {
      > .anchor-text {
        padding-left: 20px;
      }
    }
  }
}
</style>
