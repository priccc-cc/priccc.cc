<template>
  <div class="page-background-component">
    <css-doodle>
      @grid: 1 / 100vw 100vh / #0a0c27;
      background-size: 300px 300px;
      background-image: @doodle(
        @grid: 6 / 100%;
        @size: 4px;
        font-size: 6px;
        color: hsl(@r240, 30%, 50%);
        box-shadow: @m3x5(
          calc(4em - @nx*1em) @ny(*1em) @p(@m3(currentColor), @m2(#0000)),
          calc(2em + @nx*1em) @ny(*1em) @lp
        );
      );
    </css-doodle>
  </div>
</template>

<style lang="scss" scoped>
.page-background-component {
  width: 100%;
  height: 100%;
}
</style>
