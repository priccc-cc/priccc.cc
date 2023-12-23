<template>
  <div class="contents-document-container">
    <ClientOnly>
      <CommonMarkdown></CommonMarkdown>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.contents-document-container {
  height: 100%;
}
</style>
