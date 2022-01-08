<template>
  <div class="screen-full" @click="onToggleScreen">
    <svg-icon
      :size="size"
      :icon="opened ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import screenfull from 'screenfull'

defineProps({
  size: {
    type: Number,
    default: 24
  }
})
/** screen-full 触发组件 */
const opened = ref(false)

const onToggleScreen = () => {
  opened.value = !opened.value
  screenfull.toggle()
}
</script>

<style lang="scss" scoped>
.screen-full {
  cursor: pointer;
}
</style>
