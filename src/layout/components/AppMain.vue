<template>
  <div class="app-main" :class="{ 'app-header-fixed': headerFixed }">
    <el-scrollbar>
      <!-- header -->
      <div class="app-header">
        <!-- nav -->
        <nav-bar></nav-bar>
        <!-- tags -->
        <tags-view></tags-view>
      </div>
      <!-- view -->
      <router-view class="app-view"></router-view>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TagsView from '@/components/TagsView/index.vue'
import NavBar from '@/layout/components/NavBar.vue'
import { useSystemStore } from '@/store/system'

const systemStore = useSystemStore()
const headerFixed = computed(() => systemStore.headerFixed)
const headerFixedLeft = computed(() => {
  let _left = '0px'
  _left = systemStore.sideBarOpen
    ? systemStore.cssVars.sideBarWith
    : systemStore.cssVars.sideBarWithHide
  return _left
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.app-main {
  position: relative;
  width: 100%;
  height: 100%;
  .app-header {
    width: 100%;
    background-color: #fff;
  }
  .app-view {
    width: 100%;
    padding: 0px 10px 40px 10px;
  }

  &.app-header-fixed {
    .app-header {
      width: calc(100% - v-bind(headerFixedLeft));
      position: fixed;
      top: 0;
      left: v-bind(headerFixedLeft);
      z-index: 999;
    }
    .app-view {
      margin-top: 96px;
    }
  }
}
</style>
