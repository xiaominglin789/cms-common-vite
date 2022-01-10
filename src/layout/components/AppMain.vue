<template>
  <div class="app-main">
    <!-- tags -->
    <TagsView></TagsView>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TagsView from '@/components/TagsView/index.vue'
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 60px 16px 16px 16px;
  box-sizing: border-box;
}
</style>
