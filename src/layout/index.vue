<template>
  <div class="app-wrapper">
    <!-- 左边栏 -->
    <side-bar></side-bar>
    <div class="main-container">
      <nar-bar></nar-bar>
      <!-- 内容栏 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/layout/components/SideBar/index.vue'
import NarBar from '@/layout/components/NavBar.vue'
import AppMain from '@/layout/components/AppMain.vue'
</script>

<style lang="scss" scoped></style>
