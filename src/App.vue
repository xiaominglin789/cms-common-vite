<template>
  <el-config-provider :locale="localeStore.currentLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore } from '@/store/locale'
import { useSystemStore } from '@/store/system'
import { onBeforeMount } from 'vue'

const localeStore = useLocaleStore()
const systemStore = useSystemStore()

onBeforeMount(async () => {
  // 初始化工作
  // 样式、配置
  await systemStore.systemConfigInit()
})
</script>

<style>
.html,
.body,
#app {
  width: 100%;
  height: 100%;
}
</style>
