<template>
  <div class="side-bar">
    <app-logo :src="iconAvatarSrc" :title="CONST_APPLICATION_NAME"></app-logo>
    <el-scrollbar>
      <SideBarMenu></SideBarMenu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SideBarMenu from './SideBarMenu.vue'
import AppLogo from '@/components/AppLogo/index.vue'
import logoAvatarDefualt from '@/assets/logo.png'
import {
  CONST_APPLICATION_NAME,
  CONST_APPLICATION_WEB_LOGO
} from '@/constant/system'
import { computed } from 'vue'

const iconAvatarSrc = computed(() => {
  // 远程logo || 本地logo
  return CONST_APPLICATION_WEB_LOGO || logoAvatarDefualt
})
</script>

<style lang="scss" scoped></style>
