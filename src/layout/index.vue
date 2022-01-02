<template>
  <div class="app-wrapper" :class="sideBarOpenState?'open-sidebar':'hide-sidebar'">
    <!-- 左边栏 -->
    <side-bar
      class="side-container"
      :style="{ backgroundColor: styles.menuBg }"
    ></side-bar>
    <div class="main-container">
      <nav-bar class="navbar-container"></nav-bar>
      <!-- 内容栏 -->
      <app-main class="appmain-container"></app-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SideBar from '@/layout/components/SideBar/index.vue'
import NavBar from '@/layout/components/NavBar.vue'
import AppMain from '@/layout/components/AppMain.vue'
import styles from '@/styles/variables.module.scss'
import { useSystemStore } from "@/store/system"

const systemStore = useSystemStore()
const sideBarOpenState = computed(() => systemStore.sideBarOpen)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include relative;
  display: flex;
  .side-container {
    width: #{$sideBarWith};
  }
  .main-container {
    .navbar-container {
      position: fixed;
      top: 0;
      z-index: 999;
      width: calc(100% - #{$sideBarWith});
      transition: width 1s;
    }
    .appmain-container {
    }
  }
}
.hide-sidebar {
  .side-container {
    width: #{$sideBarWithHide};
  }
  .main-container {
    .navbar-container {
      width: calc(100% - #{$sideBarWithHide});
    }
  }
}
</style>
