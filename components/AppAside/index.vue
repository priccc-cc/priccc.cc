<template>
  <div class="app-aside-container">
    <ContentList :path="categoryPath" v-slot="{ list }" :query="contentQuery">
      <div
        v-for="item of list"
        :key="item._path"
        :class="[
          'nav-item',
          { 'nav-item-actived': item._path === activeContentPath },
        ]"
        @click="handleContentSlelcted(item)"
      >
        <div class="item-title">{{ item.title }}</div>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const route = useRoute()
const router = useRouter()
const type = route.params.contentType as string
const category = route.params.category as string
const title = route.params.title as string
const categoryPath = category ? `/${type}/${category}` : `/${type}`
const contentQuery = { where: [{ _type: { $eq: 'markdown' } }] }
const activeContentPath = computed(() => categoryPath + '/' + title)

function handleContentSlelcted(doc: ParsedContent) {
  router.push(doc._path!)
}
</script>

<style lang="scss" scoped>
.app-aside-container {
  .nav-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    cursor: pointer;

    &:hover,
    &.nav-item-actived {
      color: var(--el-menu-hover-text-color);
      background-color: var(--el-menu-hover-bg-color);
    }

    .item-icon {
      margin-right: 8px;
    }
  }
}
</style>
