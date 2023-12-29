<template>
  <div class="the-title-component">
    <h1 class="title-content">
      {{ data.title }}
    </h1>
    <div class="markdown-additional">
      <!-- Description -->
      <div v-if="data.description" class="description-content">
        {{ data.description }}
      </div>
      <!-- Tags -->
      <div v-if="isArray(data.tag) && data.tag.length" class="tags-content">
        <ElSpace wrap>
          <ElTag v-for="tag in data.tag" type="info">
            {{ tag }}
          </ElTag>
        </ElSpace>
      </div>
      <!-- The creater and datetime for markdown -->
      <div class="creater-content">
        <div v-if="data.author" class="author-content">
          <ElTag>作者: @{{ data.author }}</ElTag>
        </div>
        <div v-if="data.createdAt" class="datetime-content">
          <div v-if="data.createdAt" class="datetime-item">
            <span>创建于</span>
            <span>{{ data.createdAt }}</span>
          </div>
          <div v-if="data.updatedAt" class="datetime-item">
            <span>更新于</span>
            <span>{{ data.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { isArray } from 'element-plus/es/utils'

export interface Props {
  data: ParsedContent
}

const props = defineProps<Props>()
const { data } = toRefs(props)
</script>

<style lang="scss" scoped>
.the-title-component {
  margin: 0 0 4em 0;

  .title-content {
    margin: 0;
    margin-bottom: 0.6em;
    font-size: 36px;
    font-weight: bold;
  }

  .markdown-additional {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .description-content {
      color: var(--el-text-color-regular);
    }

    .creater-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:empty {
        display: none;
      }

      .datetime-content {
        display: flex;
        align-items: center;
        gap: 14px;

        .datetime-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
