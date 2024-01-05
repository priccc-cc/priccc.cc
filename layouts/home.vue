<template>
  <el-container class="layout-home">
    <el-main class="root-main">
      <ClientOnly>
        <slot></slot>
      </ClientOnly>
    </el-main>
    <el-footer class="root-footer">
      <app-footer></app-footer>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-home {
  .root-main {
    min-height: 100vh;
    padding: 0;
  }

  .root-footer {
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
