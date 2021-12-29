<template>
  <div class="com app-main">
    app-main
    <el-button @click="onTest">测试</el-button>
  </div>
</template>

<script setup lang="ts">
const onTest = async () => {}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 60px 16px 16px 16px;
  box-sizing: border-box;
}
</style>
