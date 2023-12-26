<template>
  <el-container class="layout-game">
    <el-header class="root-header">
      <client-only>
        <app-header></app-header>
      </client-only>
    </el-header>
    <el-main class="root-main">
      <slot />
    </el-main>
    <el-footer class="root-footer">
      <app-footer></app-footer>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
$header_height: 60px;
$content_height: calc(100vh - $header_height);

.layout-game {
  .root-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 0 32px;
    box-shadow: inset 0 -1px 0 0 var(--el-menu-border-color);
    background-color: var(--el-bg-color);
  }

  .root-main {
    position: relative;
    min-height: $content_height;
    padding: 0;
  }

  .root-footer {
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
