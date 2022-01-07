<template>
  <div class="">
    <span>个人中心</span>
    <el-button>测试1</el-button>
    <el-button type="primary">测试2</el-button>
    <el-radio v-model="radio1" label="1" size="large">Option 1</el-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio1 = ref(false)
</script>

<style lang="scss" scoped></style>
