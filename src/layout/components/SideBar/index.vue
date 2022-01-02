<template>
    <div class="side-bar">
      <div class="logo">Logo</div>
      <el-scrollbar>
        <SideBarMenu></SideBarMenu>
      </el-scrollbar>
      <!--
      <el-menu
        :default-active="defaultRoutePath"
        :unique-opened="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-sub-menu>
          <template #title>
            <span>菜单管理</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>用户管理2</el-menu-item>
        </el-sub-menu>

        <el-menu-item>用户管理3</el-menu-item>
      </el-menu>
      -->
    </div>
</template>

<script setup lang="ts">
import SideBarMenu from './SideBarMenu.vue'
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
