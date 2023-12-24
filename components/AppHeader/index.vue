<template>
  <div class="app-header-container">
    <div class="logo-container" @click="handleLogoClicked">知无涯</div>
    <div class="menu-container">
      <ClientOnly>
        <AppHeaderMenu></AppHeaderMenu>
      </ClientOnly>
    </div>
    <div class="action-contaienr">
      <ClientOnly>
        <AppHeaderSearcher></AppHeaderSearcher>
        <el-divider direction="vertical" />
        <div class="theme-content">
          <el-switch
            style="--el-switch-on-color: #000000"
            :model-value="isDark"
            @change="value => toggleDark(value as boolean)"
          >
            <template #active-action>
              <i class="iconfont icon-moon"></i>
            </template>
            <template #inactive-action>
              <i class="iconfont icon-sun"></i>
            </template>
          </el-switch>
        </div>
      </ClientOnly>
      <el-divider direction="vertical" />
      <div class="github-content">
        <i class="iconfont icon-github"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// disableTransition: false to fix <el-switch> no animation
const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)
const router = useRouter()

function handleLogoClicked() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.app-header-container {
  display: flex;
  align-items: center;

  .logo-container {
    height: 100%;
    font-family: AlimamaDaoLiTi;
    font-weight: 500;
    font-size: 30px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }

  .menu-container {
    flex: 1;
    margin: 0 20px;
  }

  .action-contaienr {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .github-content i {
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>
