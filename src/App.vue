<template>
  <el-config-provider :locale="localeStore.currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore } from '@/store/locale'
import { useSystemStore } from '@/store/system'

const localeStore = useLocaleStore()
const systemStore = useSystemStore()

// 初始化-样式、配置
systemStore.changeThemeColor(systemStore.themeColor)
</script>

<style>
.html,
.body,
#app {
  width: 100%;
  height: 100%;
}
</style>
