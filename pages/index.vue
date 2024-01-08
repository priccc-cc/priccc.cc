<template>
  <div class="home-page-container">
    <ClientOnly>
      <div class="home-animation-background">
        <component :is="currentAnimation"></component>
      </div>
    </ClientOnly>
    <div class="home-content">
      <ClientOnly>
        <div class="background-animation-action">
          <el-popover
            :width="240"
            effect="dark"
            placement="bottom"
            popper-class="background-animation-popover"
          >
            <template #reference>
              <el-button circle>
                <i class="iconfont icon-skin-f"></i>
              </el-button>
            </template>
            <div class="background-animation-list">
              <div
                v-for="(item, index) in animations"
                :key="index"
                :class="[
                  'background-animation-item',
                  { 'actived-item': currentIndex === index },
                ]"
                @click="handleChangeBackground(item, index)"
              >
                <span class="option-label">{{ item.label }}</span>
                <span class="option-description">{{ item.description }}</span>
              </div>
            </div>
          </el-popover>
        </div>
      </ClientOnly>

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
import { useTitle, useStorage } from '@vueuse/core'

import config from '@/components/HomePageBrackground/index'

definePageMeta({ layout: 'home' })

type BackgroundAnimation = (typeof animations)[number]

const router = useRouter()
const animations = config // 背景动画列表
const currentIndex = useStorage('dynmica-background', 0)
const currentAnimation = computed(
  () => animations[currentIndex.value].component,
)
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
// Change background animation
function handleChangeBackground(item: BackgroundAnimation, index: number) {
  currentIndex.value = index
}

useTitle('知无涯')

onMounted(() => {
  handleStartAnimation()
})
</script>

<style lang="scss">
.background-animation-popover {
  .background-animation-list {
    .background-animation-item {
      display: flex;
      justify-content: space-between;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        color: #409eff;
        background-color: #18222c;
      }

      &.actived-item {
        color: #409eff;
      }

      .option-description {
        font-size: 12px;
        color: #a8a8a8;
      }
    }
  }
}
</style>
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
    background-color: rgba(255, 255, 255, 0.15);

    .background-animation-action {
      position: absolute;
      top: 20px;
      right: 24px;
    }

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
      display: flex;
      align-items: center;
      margin-top: 80px;
      opacity: 0;
    }
  }
}
</style>
