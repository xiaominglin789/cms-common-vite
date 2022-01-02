<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// test

const onTest = async () => {
  console.log('测试按钮点击')
}
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
