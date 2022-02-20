<template>
  <el-menu
    :collapse="!sideBarOpenState"
    :default-active="defaultRoutePath"
    :unique-opened="true"
    :background-color="cssVars.menuBg"
    :text-color="cssVars.menuText"
    :active-text-color="cssVars.menuActiveText"
    router
  >
    <!-- 根据menu渲染menu列表 -->
    <side-bar-menu-item
      v-for="menu in menus"
      :key="menu.path"
      :route="menu"
    />
  </el-menu>
</template>

<script setup lang="ts">
import SideBarMenuItem from './SideBarMenuItem.vue'
import RouteHelper from '@/utils/routeHelper'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSystemStore } from '@/store/system'

const route = useRoute()
const router = useRouter()
const systemStore = useSystemStore()

const cssVars = computed(() => systemStore.cssVars)
const sideBarOpenState = computed(() => systemStore.sideBarOpen)
const defaultRoutePath = computed(() => route.path)
const menus = computed(() => {
  const allRoutes = router.getRoutes()
  const filterRoutes = RouteHelper.filterRoutes(allRoutes)
  return RouteHelper.routeToMenu(filterRoutes)
})
</script>

<style lang="scss" scoped>
/** 去除el-menu 伸缩动画边缘线 */
.el-menu {
  border-right: 0 !important;
}
</style>
