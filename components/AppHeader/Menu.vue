<template>
  <el-menu
    class="menu-container"
    mode="horizontal"
    :default-active="defaultActive"
    :close-on-click-outside="true"
    @select="onMeunSelected"
  >
    <!-- Markdown content menu list -->
    <template v-for="menu in navigation!" :key="menu._path">
      <el-sub-menu
        v-if="menu.hasSubDir"
        :key="'sub' + menu._path"
        :index="menu._path"
      >
        <template #title>
          <el-icon v-if="menu.icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#' + menu.icon"></use>
            </svg>
          </el-icon>
          <span>{{ menu.title }}</span>
        </template>

        <el-menu-item
          v-for="sub in menu.children"
          :key="sub._path"
          :index="sub._path"
        >
          <template #title>
            <el-icon v-if="sub.icon">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#' + sub.icon"></use>
              </svg>
            </el-icon>
            <span>{{ sub.title }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :key="menu._path" :index="menu._path">
        <template #title>
          <el-icon v-if="menu.icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#' + menu.icon"></use>
            </svg>
          </el-icon>
          <span>{{ menu.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- Games single menu item -->
    <el-menu-item index="game" key="/game">
      <template #title>
        <el-icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-menu_game"></use>
          </svg>
        </el-icon>
        <span>小游戏</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const defaultActive = ref('')
const { data: navigation } = await useAsyncData('navigation', () =>
  fetchContentNavigation(),
)

watchEffect(() => {
  const type = route.params.contentType as string
  const category = route.params.category as string

  // This is markdown route.
  if (type) {
    defaultActive.value = category ? `/${type}/${category}` : `/${type}`
  }
  // Is not markdown route.
  else {
    defaultActive.value = route.name as string
  }
})

function onMeunSelected(key: string, keyPath: string[]) {
  if (key === 'game') {
    return router.push('/' + key)
  }

  const keyPathRe = keyPath.filter(x => x !== 'sub-menu-more')
  const currentType = navigation.value?.find(
    item => item._path === keyPathRe[0],
  )!
  let currentCategory: typeof currentType | null = null
  let contentList: Array<typeof currentType> = []
  let path = ''

  if (keyPathRe.length === 1) {
    contentList = currentType.children || []
    path = key
  }
  if (keyPathRe.length === 2) {
    currentCategory = currentType.children?.find(
      item => item._path === keyPathRe[1],
    )!
    contentList = currentCategory.children || []
    path = keyPathRe[1]
  }

  if (contentList.length) {
    path = contentList[0]._path
  }

  // defaultActive.value
  router.push(path)
}
</script>
