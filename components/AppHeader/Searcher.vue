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

    <Teleport to="body">
      <el-dialog
        v-model="searchModalShow"
        width="500"
        :show-close="false"
        destroy-on-close
      >
        <span>此功能暂不可用</span>
      </el-dialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const searchKey = ref('')
const searchPlaceholder = ref('')
const searchModalShow = ref(false)
const keys = useMagicKeys()

// The handler for show search markdown content modal
function handleShowSearchModal() {
  searchModalShow.value = true
}

onMounted(() => {
  const os = platformOs()
  const isMac = os === 'macos'
  const magicKey = isMac ? keys.command_k : keys.ctrl_k

  searchPlaceholder.value = isMac ? '⌘+K' : 'Ctrl+K'

  whenever(magicKey, handleShowSearchModal)
})
</script>

<style lang="scss" scoped>
.searcher-component {
  .searcher-input {
    width: 80px;
  }
}
</style>
