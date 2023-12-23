<template>
  <el-container class="layout-root">
    <el-header class="root-header">
      <app-header></app-header>
    </el-header>
    <el-container class="root-content">
      <el-aside class="root-aside">
        <app-aside></app-aside>
      </el-aside>
      <el-main class="root-main">
        <slot />
      </el-main>
      <el-aside class="root-anchor">
        <client-only>
          <app-toc></app-toc>
        </client-only>
      </el-aside>
    </el-container>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<style scoped lang="scss">
$header_height: 60px;
$content_height: calc(100vh - $header_height);

.layout-root {
  .root-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    box-shadow: inset 0 -1px 0 0 var(--el-menu-border-color);
    background-color: var(--el-bg-color);
  }

  .root-content {
    position: relative;
    min-height: $content_height;

    .root-aside {
      position: sticky;
      left: 0;
      top: $header_height;
      width: 240px;
      height: $content_height;
      border-right: 1px solid var(--el-border-color);
    }

    .root-main {
      padding: 0;
    }

    .root-anchor {
      position: sticky;
      top: $header_height;
      right: 0;
      width: 180px;
      height: $content_height;
      border-left: 1px solid var(--el-border-color);
    }
  }
}
</style>
