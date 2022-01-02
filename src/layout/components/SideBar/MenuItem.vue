<template>
  <!-- 渲染icon+标题 -->
  <el-icon v-if="isElementSvgIcon" class="svg-icon" :class="icon"></el-icon>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ title }}</span>
</template>

<script setup lang="ts">
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
.span {
  margin-left: 4px;
}
</style>
