<template>
  <div class="app-toc-container">
    <div
      v-for="item in links"
      class="anchor-item item-level-1"
      @click="setActive(item.id)"
    >
      <div :class="['anchor-text', { 'actived-anchor': item.id === activeId }]">
        <span>{{ item.text }}</span>
      </div>

      <div
        v-if="item.children"
        v-for="sub in item.children"
        class="anchor-item item-level-2"
      >
        <div class="anchor-text">
          <span>{{ sub.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActiveScroll } from 'vue-use-active-scroll'

// export interface Props {
//   toc: any
// }

// const props = defineProps<Props>()
// const { toc } = toRefs(props)
const { toc } = useContent()
const links = toc.value.links || []
const ids = computed(() =>
  links.flatMap(({ id = '', children = [] }) => [
    id,
    ...children.map(({ id }) => id),
  ]),
)
const { setActive, activeId } = useActiveScroll(ids, { jumpToFirst: true })

watch(activeId, val => console.log(val))

console.log(222, ids.value, activeId.value)

// console.log(333, toc.value)
</script>

<style lang="scss" scoped>
.app-toc-container {
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
        background-color: var(--el-menu-hover-bg-color);
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
