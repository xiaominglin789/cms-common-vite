<template>
  <!-- 渲染icon+标题 -->
  <el-icon
    v-if="isElementSvgIcon"
    class="svg-icon"
    :class="icon"
  />
  <svg-icon
    v-else
    :icon="icon"
  />
  <span>{{ title && generalRouteMenuTitle(title) }}</span>
</template>

<script setup lang="ts">
import { generalRouteMenuTitle } from '@/utils/i18n'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    reqired: true
  },
  icon: {
    type: String,
    reqired: true
  }
})

/** element-icon svg图标特定前缀: el-icon- , 否则就是本地svg图表 */
const isElementSvgIcon = computed(() => props.icon?.includes('el-icon'))
</script>

<style lang="scss" scoped>
span {
  margin-left: 6px;
}
</style>
