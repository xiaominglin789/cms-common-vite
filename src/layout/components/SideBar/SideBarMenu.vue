<template>
  <el-menu
    :collapse="!sideBarOpenState"
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
import { useSystemStore } from "@/store/system"

const route = useRoute()
const router = useRouter()
const systemStore = useSystemStore()

const sideBarOpenState = computed(() => systemStore.sideBarOpen)
const defaultRoutePath = computed(() => route.path)
const menus = computed(() => {
  const allRoutes = router.getRoutes()
  const filterRoutes = RouteHelper.filterRoutes(allRoutes)
  return RouteHelper.routeToMenu(filterRoutes)
})
</script>

<style lang="scss" scoped></style>
