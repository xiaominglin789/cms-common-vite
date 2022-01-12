<template>
  <div class="">
    <span>个人中心</span>
    <el-button>测试</el-button>
    <el-button type="primary" @click="ontest">测试2</el-button>
    <!-- 测试嵌套路由 -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSystemStore } from '@/store/system'

const test = ref('')
const systemStore = useSystemStore()

const ontest = () => {
  console.log(systemStore.headerFixedOpen)
}
</script>

<style lang="scss" scoped></style>
