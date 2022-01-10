<template>
  <div
    class="app-wrapper"
    :class="sideBarOpenState ? 'open-sidebar' : 'hide-sidebar'"
  >
    <!-- 左边栏 -->
    <side-bar
      class="side-container"
      :style="{ backgroundColor: cssVars.menuBg }"
    ></side-bar>
    <!-- 内容区 -->
    <app-main class="appmain-container"></app-main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SideBar from '@/layout/components/SideBar/index.vue'
import AppMain from '@/layout/components/AppMain.vue'
import { useSystemStore } from '@/store/system'

const systemStore = useSystemStore()
const sideBarOpenState = computed(() => systemStore.sideBarOpen)
const cssVars = computed(() => systemStore.cssVars)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include relative;
  display: flex;
  flex-direction: row;
  .appmain-container {
    flex: 1;
  }
  &.open-sidebar {
    .side-container {
      flex: 0 0 #{$sideBarWith};
    }
  }
  &.hide-sidebar {
    .side-container {
      flex: 0 0 #{$sideBarWithHide};
    }
  }
}
</style>
