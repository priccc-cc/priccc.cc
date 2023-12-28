<template>
  <div class="searcher-component">
    <div class="searcher-box" @click="handleShowSearchModal">
      <div class="icon-block">
        <i class="iconfont icon-search"></i>
      </div>
      <div class="placeholder-block">
        {{ searchPlaceholder }}
      </div>
    </div>

    <Teleport to="body">
      <el-dialog
        v-model="showSearchModal"
        width="600"
        class="searcher-result-dialog"
        :show-close="false"
        destroy-on-close
        @opened="handleFocusInput"
      >
        <template #header>
          <el-input
            ref="searcherRef"
            v-model:model-value="searchKey"
            size="large"
            placeholder="请输入要搜索的内容"
            @input="handleSearcherInput"
          >
            <template #prefix>
              <i class="iconfont icon-search"></i>
            </template>
          </el-input>
        </template>
        <div v-loading="status === 'pending'" class="searcher-modal-content">
          <div v-if="results.length" class="searcher-result-content">
            <div
              v-for="item in results"
              :key="item.id"
              class="searcher-result-item"
              @click="handleNavtoContent(item)"
            >
              <div class="result-title">
                <span class="title">{{ item._page.title }}</span>
                <i class="iconfont icon-icon_jinrujiantouxiaodefuben"></i>
                <span class="path" v-html="item._html"></span>
              </div>
              <div
                v-if="item.content"
                class="result-content text-clamp-2"
                v-html="item.content"
              ></div>
            </div>
          </div>
          <el-empty v-else description="暂无匹配的搜索内容" />
        </div>
      </el-dialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const searcherRef = ref()
const searchKey = ref('')
const searchPlaceholder = ref('')
const showSearchModal = ref(false)
const keys = useMagicKeys()
// Get all markdown list
const { data: contentList } = await useAsyncData(() =>
  queryContent('/')
    .where({ _type: { $eq: 'markdown' } })
    .find(),
)
const { data, status, refresh } = await useAsyncData(
  () => searchContent(searchKey, {}),
  { immediate: false },
)
const results = computed(() =>
  (data.value?.value || []).map((item: any) => {
    const res = { ...item }
    const _path = res.id.split('#')[0]

    res._page = contentList.value?.find(x => x._path === _path)
    res._html = handleHighlightKeyword(res.title, item.queryTerms[0])
    res.content = handleHighlightKeyword(res.content, item.queryTerms[0])

    return res
  }),
)

// The handler for show search markdown content modal
const handleShowSearchModal = () => {
  showSearchModal.value = true
}
const handleFocusInput = () => {
  searcherRef.value.focus()
}
// The handler for search input change
const handleSearcherInput = useThrottleFn(() => {
  refresh()
})
// The handle for highlight keyword
const handleHighlightKeyword = (text = '', keyword = '') => {
  if (!text) return ''

  const _reg = new RegExp(keyword, 'gi')
  const nextText = text.replace(
    _reg,
    "<span class='is-searched-keyword'>$&</span>",
  )

  return nextText
}
// Nav to content page
const handleNavtoContent = (item: any) => {
  showSearchModal.value = false
  searchKey.value = ''
  router.push(item._page._path)
}

// watch(
//   () => results.value,
//   () => {
//     console.log(results.value)
//   },
// )
// watch(
//   () => contentList.value,
//   () => {
//     console.log(contentList.value)
//   },
// )

onMounted(() => {
  const os = platformOs()
  const isMac = os === 'macos'
  const magicKey = isMac ? keys.command_k : keys.ctrl_k

  searchPlaceholder.value = isMac ? '⌘+K' : 'Ctrl+K'

  whenever(magicKey, handleShowSearchModal)
})
</script>

<style lang="scss">
.is-searched-keyword {
  color: var(--el-color-primary);
}

.searcher-result-dialog {
  .el-dialog__body {
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
<style lang="scss" scoped>
.searcher-component {
  .searcher-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 36px;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      border-color: var(--el-color-primary);
    }

    .icon-block {
      margin-right: 6px;
    }

    .placeholder-block {
      color: var(--el-text-color-placeholder);
    }
  }
}

.searcher-modal-content {
  overflow: auto;
  height: 40vh;

  .searcher-result-item {
    padding: 4px 10px;
    margin-bottom: 8px;
    font-size: 14px;
    cursor: pointer;

    .result-title {
      display: flex;
      align-items: center;
      gap: 4px;

      .title {
        font-weight: bold;
      }

      .iconfont {
        font-size: 12px;
        font-weight: bold;
      }

      .path {
        margin-left: 4px;
      }
    }

    .result-content {
      font-size: 12px;
    }

    &:hover {
      border-radius: 6px;
      background-color: var(--el-color-primary-light-9);
    }
  }
}
</style>
