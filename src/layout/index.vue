<template>
  <div class="app-wrapper">
    <!-- 左边栏 -->
    <side-bar
      class="side-container"
      :style="{ width: styles.sideBarWith, backgroundColor: styles.menuBg }"
    ></side-bar>
    <div class="main-container">
      <nav-bar class="navbar-container"></nav-bar>
      <!-- 内容栏 -->
      <app-main class="appmain-container"></app-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/layout/components/SideBar/index.vue'
import NavBar from '@/layout/components/NavBar.vue'
import AppMain from '@/layout/components/AppMain.vue'
import styles from '@/styles/variables.module.scss'
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  @include relative;
  display: flex;

  .side-container {
  }

  .main-container {
    width: 100%;
    .navbar-container {
      position: fixed;
      top: 0;
      z-index: 999;
    }

    .appmain-container {
    }
  }
}
</style>
