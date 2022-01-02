<template>
  <el-menu
    :default-active="defaultRoutePath"
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <!-- 根据menu渲染menu列表 -->
    <side-bar-menu-item
      v-for="menu in menus"
      :key="menu.path"
      :route="menu"
    ></side-bar-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import SideBarMenuItem from "./SideBarMenuItem.vue"
import RouteHelper from '@/utils/routeHelper'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const defaultRoutePath = computed(() => route.path)
const menus = computed(() => {
  const allRoutes = router.getRoutes()
  const m = RouteHelper.routeToMenu(RouteHelper.filterRoutes(allRoutes))
  console.log(m)
  return m
})
</script>

<style lang="scss" scoped></style>
