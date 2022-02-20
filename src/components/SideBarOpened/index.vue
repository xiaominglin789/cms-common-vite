<template>
  <div
    class="side-bar-opened"
    @click="onChange"
  >
    <svg-icon :icon="svgIconName" />
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/system'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const systemStore = useSystemStore()
const { sideBarOpen } = storeToRefs(systemStore)
const svgIconName = computed(() =>
  sideBarOpen ? 'hamburger-opened' : 'hamburger-closed'
)

const onChange = () => {
  systemStore.triggerSideBarOpened()
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.side-bar-opened {
  display: inline-block;
  width: 32px;
  height: 32px;
  @include flexRow(center, center);
  :deep(.svg-icon) {
    width: 20px;
    height: 20px;
  }
}
</style>
