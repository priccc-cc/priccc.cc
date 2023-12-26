<template>
  <div class="home-page-container">
    <div class="home-animation-background">
      <component :is="Backgrounder"></component>
    </div>
    <div class="home-content">
      <div class="nameplate-content">
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
        <el-button
          v-if="firstNavigation"
          type="primary"
          size="large"
          round
          @click="handleGetStart"
        >
          开始吧
          <i class="iconfont icon-arrowRight"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { useTitle } from '@vueuse/core'
import type { Component } from 'vue'

definePageMeta({ layout: 'home' })

const BrackgroundAnim1 = resolveComponent('HomePageBrackgroundAnim1')
const BrackgroundAnim2 = resolveComponent('HomePageBrackgroundAnim2')

const router = useRouter()
const Backgrounder = shallowRef<Component | null>()
const tl = gsap.timeline({}) // Registe GSAP
const { data: navigation } = await useAsyncData('navigation', () =>
  fetchContentNavigation(),
)
// The first markdown content navgation
const firstNavigation = computed(() => {
  if (!navigation.value) return null

  const contentType = navigation.value[0]

  if (!contentType.children) return null

  const categoryOrContent = contentType.children[0]

  if (contentType.hasSubDir && categoryOrContent.children) {
    return categoryOrContent.children[0]
  }

  return categoryOrContent
})

watch(navigation, () => console.log(navigation.value))

// Start action handler
function handleGetStart() {
  router.push(firstNavigation.value!._path)
}
// Home content animation handler
function handleStartAnimation() {
  tl.to('.char-item', {
    opacity: 1,
    delay: 0.1,
    duration: 1,
    y: 0,
    ease: 'power4.inOut',
    stagger: 0.1,
  }).to('.start-action', {
    opacity: 1,
  })
}

useTitle('知无涯')

onMounted(() => {
  Backgrounder.value = BrackgroundAnim2 as Component
  handleStartAnimation()
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
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    height: 100%;
    width: 100%;
  }

  .home-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    // backdrop-filter: blur(1px);
    background-color: rgba(255, 255, 255, 0.1);

    .nameplate-content {
      position: relative;
      color: #ffffff;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

      .char-item {
        display: inline-block;
        margin-right: 6px;
        opacity: 0;
        font-size: 30px;

        &:nth-child(-n + 3) {
          font-size: 100px;
          font-weight: bold;
          font-family: 'AlimamaDongFangDaKai';
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
      opacity: 0;
    }
  }
}
</style>
