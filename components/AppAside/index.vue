<template>
  <div class="app-aside-container">
    <ContentList path="/" :query="contentQuery" v-slot="{ list }">
      <div>
        <div
          v-for="item of list"
          :key="item._path"
          :class="[
            'nav-item',
            { 'nav-item-actived': item._path === $route.path },
          ]"
          @click="handleContentSlelcted(item)"
        >
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const route = useRoute()
const router = useRouter()
const contentQuery = { where: [{ _type: { $eq: 'markdown' } }] }
const isReady = ref(false)
const categoryPath = ref('')

console.log(route)

watch(
  () => route.params.title,
  () => {
    const type = route.params.contentType as string
    const category = route.params.category as string
    const title = route.params.title as string

    categoryPath.value = category ? `/${type}/${category}` : `/${type}`
    isReady.value = true
  },
  // { immediate: true },
)

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
