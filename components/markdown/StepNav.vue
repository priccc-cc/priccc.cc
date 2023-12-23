<template>
  <NuxtLink :to="path" custom v-slot="{ navigate, href }">
    <div
      :class="['step-nav-item', `nav-${type}`]"
      @click="handleStepNav(navigate, href)"
    >
      <div v-if="type === 'prev'" class="icon-info">
        <span>上一页</span>
      </div>
      <div v-if="type === 'next'" class="icon-info">
        <span>下一页</span>
      </div>
      <span>{{ title }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
export interface Props {
  path: string
  title: string
  type: 'prev' | 'next'
}

const props = defineProps<Props>()
const { path, title, type } = toRefs(props)

function handleStepNav(navigate: Function, path: string) {
  navigate()
}
</script>

<style lang="scss" scoped>
.step-nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 0 18px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: var(--el-color-primary);
  }

  & > span {
    color: var(--el-color-primary);
  }

  .icon-info {
    display: flex;
    align-items: center;
    font-size: 12px;
  }

  &.nav-next {
    align-items: flex-end;
  }
}
</style>
