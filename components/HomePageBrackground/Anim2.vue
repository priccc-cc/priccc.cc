<template>
  <div class="page-background-component">
    <css-doodle grid="20">
      :doodle {
        @size: 100vw 100vmin;
        perspective: 10px;
      }
      :container {
        perspective: 50px;
        transform-style: preserve-3d;
      }
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      background: hsl(@rn(1, 255, 3), @rn(50%, 90%), @rn(50%, 90%));
      transform: scale(@rn(1, 10, 3)) translate3d(@rn(-50, 50, 3)vw, @rn(-50, 50, 3)vh, @rn(-100, 20)px);
      animation: move @rn(5, 15, 3)s infinite @rn(-20, -10, 3)s linear alternate;
      box-shadow: 0 0 1px #fff, 0 0 5px #fff;
      @keyframes move {
        100% { margin-top: 500px; }
      }
  </css-doodle>
  </div>
</template>

<script setup lang="ts">
useScriptTag(
  'https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.37.4/css-doodle.min.js',
)
</script>

<style lang="scss" scoped>
.page-background-component {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000000;
}
</style>
