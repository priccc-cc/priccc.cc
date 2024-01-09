<template>
  <div v-if="categoryPath" :key="categoryPath" class="app-aside-container">
    <div v-if="$route.params.category" class="category-title">
      {{ handleToUpperCaseFirstChar($route.params.category as string) }}
    </div>
    <ContentList :path="categoryPath" :query="contentQuery" v-slot="{ list }">
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
const categoryPath = ref('')

watch(
  () => route.params.title,
  () => {
    const type = route.params.contentType as string
    const category = route.params.category as string

    categoryPath.value = category ? `/${type}/${category}` : `/${type}`
  },
  { immediate: true },
)

function handleContentSlelcted(doc: ParsedContent) {
  router.push(doc._path!)
}

// To first char toUpperCase
function handleToUpperCaseFirstChar(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
</script>

<style lang="scss" scoped>
.app-aside-container {
  .category-title {
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: bold;
  }

  .nav-item {
    display: flex;
    align-items: center;
    height: 34px;
    padding-right: 32px;
    cursor: pointer;

    &:hover,
    &.nav-item-actived {
      color: var(--el-menu-hover-text-color);
    }

    .item-icon {
      margin-right: 8px;
    }

    .item-title {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
