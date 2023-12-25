<template>
  <div class="app-header-container">
    <div class="logo-container" @click="handleLogoClicked">
      <img class="logo-image" src="~/assets/images/logo.png" alt="" />
      <span>无涯</span>
    </div>
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
      <ElLink
        class="github-content"
        :underline="false"
        href="https://github.com/Priccc/advance-myself"
        target="_blank"
      >
        <i class="iconfont icon-github"></i>
      </ElLink>
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
    display: flex;
    align-items: center;
    height: 100%;
    border-bottom: 2px solid transparent;
    cursor: pointer;

    .logo-image {
      width: 28px;
      margin-right: 4px;
    }

    span {
      font-family: AlimamaDongFangDaKai;
      font-weight: 500;
      font-size: 24px;
    }
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
