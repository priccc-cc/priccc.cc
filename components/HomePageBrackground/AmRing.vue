<template>
  <div class="page-background-component">
    <css-doodle>
      @grid: 1 / 40vmin;
      
      clip-path: @shape(
        split: 120;
        frame: 15;
        r: cos(t/10)^sin(t)^sin(2t)*.9;
      );

      background: linear-gradient(
        @m3(hsl(calc(@t/@r(15, 20)), 60%, 60%))
      );

      transform: rotate(calc(@t * .0006turn));
    </css-doodle>
  </div>
</template>

<style lang="scss" scoped>
.page-background-component {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: #000000;
}
</style>
