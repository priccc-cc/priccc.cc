<template>
  <div class="app-footer-component">
    <div class="filiing-block">
      <el-space>
        <el-link
          class="psf"
          href="https://beian.mps.gov.cn/#/query/webSearch?code=11010802043767"
          ref="noreferrer"
          target="_blank"
        >
          <img src="~/assets/images/filing.png" alt="" style="width: 16px" />
          <span>京公网安备11010802043767号</span>
        </el-link>
        <el-link class="icp" href="https://beian.miit.gov.cn/" target="_blank">
          <span>京ICP备2024041203号</span>
        </el-link>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-footer-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 10px 0;

  .filiing-block {
  }
}
</style>
