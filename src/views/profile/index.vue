<template>
  <div class="">
    <span>个人中心</span>
    <el-button>测试1</el-button>
    <el-button type="primary" @click="ontest">测试2</el-button>
    <el-radio v-model="radio1" label="1" size="large">Option 1</el-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSystemStore } from '@/store/system'

const radio1 = ref(false)
const systemStore = useSystemStore()

const ontest = () => {
  systemStore.headerFixed = !systemStore.headerFixed
  console.log(systemStore.headerFixed)
}
</script>

<style lang="scss" scoped></style>
