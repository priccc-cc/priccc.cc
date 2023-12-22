<template>
  <div class="searcher-component">
    <el-input
      class="searcher-input"
      v-model:model-value="searchKey"
      :placeholder="searchPlaceholder"
    >
      <template #prefix>
        <el-icon class="el-input__icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
          </svg>
        </el-icon>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
const searchKey = ref('')
const searchPlaceholder = ref('')

onMounted(() => {
  const os = platformOs()

  searchPlaceholder.value = os === 'macos' ? '⌘+K' : 'Ctrl+K'
})
</script>

<style lang="scss" scoped>
.searcher-component {
  .searcher-input {
    width: 80px;
  }
}
</style>
