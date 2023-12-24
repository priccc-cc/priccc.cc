<template>
  <div class="home-page-container">
    <div class="home-animation-background">
      <div class="text-content">
        <div class="char-item">知</div>
        <div class="char-item">无</div>
        <div class="char-item">涯</div>
        <div class="char-item">.</div>
        <div class="char-item">P</div>
        <div class="char-item">r</div>
        <div class="char-item">i</div>
        <div class="char-item">c</div>
        <div class="char-item">c</div>
        <div class="char-item">c</div>
      </div>

      <div class="start-action">
        <el-button type="primary" size="large" round @click="handleGetStart">
          开始吧
          <i class="iconfont icon-arrowRight"></i>
        </el-button>
      </div>
    </div>
    <!-- <div class="home-content"></div> -->
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({
  layout: 'home',
})

const router = useRouter()
const { navigation } = useContent()
const tl = gsap.timeline({})
const theFirstNavigation = computed(() => {
  const contentType = navigation.value[0]
  const categoryOrContent = contentType.children[0]

  if (contentType.hasSubDir) {
    return categoryOrContent.children[0]
  }

  return categoryOrContent
})

function handleGetStart() {
  router.push(theFirstNavigation.value._path)
}

onMounted(() => {
  tl.to('.char-item', {
    opacity: 1,
    delay: 0.1,
    duration: 1,
    y: 0,
    ease: 'power4.inOut',
    stagger: 0.1,
  })
})
</script>

<style lang="scss" scoped>
.home-page-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;

  .home-animation-background {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    .text-content {
      position: relative;
      color: #333333;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

      .char-item {
        display: inline-block;
        margin-right: 6px;
        opacity: 0;
        font-size: 30px;

        &:nth-child(-n + 3) {
          font-size: 100px;
          font-weight: bold;
          font-family: 'AlimamaDaoLiTi';
          background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
          color: transparent;
          background-clip: text;
        }
        &:nth-child(4) {
          font-size: 50px;
        }
      }
    }

    .start-action {
      margin-top: 80px;
    }
  }

  .home-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(2px);
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
