<template>
  <!-- 根据route.children判断用什么组件展示el-sub-menu / el-menu-item -->
  <el-sub-menu v-if="route?.children.length > 0" :index="route?.path">
    <template #title>
      <menu-item
        :title="route?.meta.title"
        :icon="route?.meta.icon"
      ></menu-item>
    </template>
    <!-- 递归展示子列表 -->
    <side-bar-menu-item
      v-for="child in route?.children"
      :key="child.path"
      :route="child"
    ></side-bar-menu-item>
  </el-sub-menu>
  <!-- 没children -->
  <el-menu-item v-else :index="route?.path">
    <menu-item :title="route?.meta.title" :icon="route?.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue'
defineProps({
  route: {
    type: Object,
    require: true
  }
})
</script>

<style lang="scss" scoped></style>
