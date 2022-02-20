<template>
  <div
    class="app-guide"
    @click="clickGuideStart"
  >
    <el-tooltip
      :content="$t('guide.content')"
      effect="light"
    >
      <div>
        <!-- 为何el-tooltip不能识别我自定义的svg-icon组件？非得再包一个标签? -->
        <svg-icon
          :size="size"
          :icon="icon"
        />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import Diver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n'
import { guideSteps } from '@/utils/guide'

defineProps({
  size: {
    type: Number,
    default: 24
  },
  icon: {
    type: String,
    default: 'guide'
  }
})

const i18n = useI18n()
/** diver实例 */
let diver!: Diver

/** 初始化 */
onMounted(() => {
  diver = new Diver({
    allowClose: true,
    closeBtnText: i18n.t('guide.close'),
    nextBtnText: i18n.t('guide.next'),
    prevBtnText: i18n.t('guide.prev')
  })
})

/** 点击开始功能引导 */
const clickGuideStart = () => {
  nextTick(() => {
    diver.defineSteps(guideSteps(i18n))
    diver.start()
  })
}
</script>

<style lang="scss" scoped></style>

<style>
/** 修改diver的默认遮罩 */
#driver-highlighted-element-stage {
  opacity: 0.5 !important;
}
</style>
