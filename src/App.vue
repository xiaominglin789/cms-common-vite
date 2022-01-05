<template>
  <el-config-provider :locale="localeStore.currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore } from '@/store/locale'

const localeStore = useLocaleStore()
</script>

<style>
.html,
.body,
#app {
  width: 100%;
  height: 100%;
}
</style>
