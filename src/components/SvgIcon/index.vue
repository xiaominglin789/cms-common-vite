<template>
  <!-- 展示外部图标 -->
  <div
    v-if="isWebURL"
    :style="styleWithWebIcon"
    class="svg-web-icon svg-icon"
    :class="className"
  ></div>
  <!-- 展示ui库的内部图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="styleLocal" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { checkIsWebURL } from '@/utils/utils'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
})

// 是否为外部图标
const isWebURL = computed(() => checkIsWebURL(props.icon))
// web-svg样式
const styleWithWebIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
// 内部svg样式
const styleLocal = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-web-icon {
  background-color: currentColor;
  mask-size: cover !important;
  -webkit-mask-size: cover !important;
  display: inline-block;
}
</style>
