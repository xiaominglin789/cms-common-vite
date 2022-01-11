<template>
  <div class="app-main" :class="{ 'app-header-fixed': headerFixed }">
    <el-scrollbar>
      <!-- header -->
      <div class="app-header">
        <!-- nav -->
        <nav-bar></nav-bar>
        <!-- tags -->
        <tags-view></tags-view>
      </div>
      <!-- view -->
      <Suspense>
        <template #default>
          <router-view v-slot="{ Component, route }" class="app-view">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <component :is="Component" :key="route.path" />
              </keep-alive>
            </transition>
          </router-view>
        </template>
        <template #fallback> Loading... </template>
      </Suspense>
      <!-- end section router-view -->
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import TagsView from '@/components/TagsView/index.vue'
import NavBar from '@/layout/components/NavBar.vue'
import { useSystemStore } from '@/store/system'
import { storeToRefs } from 'pinia'

const systemStore = useSystemStore()
const { headerFixedLeftPosition, headerFixedOpen: headerFixed } =
  storeToRefs(systemStore)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.app-main {
  position: relative;
  width: 100%;
  height: 100%;
  .app-header {
    width: 100%;
    background-color: #fff;
  }
  .app-view {
    width: 100%;
    padding: 0px 10px 40px 10px;
  }

  &.app-header-fixed {
    .app-header {
      width: calc(100% - v-bind(headerFixedLeftPosition));
      position: fixed;
      top: 0;
      left: v-bind(headerFixedLeftPosition);
      z-index: 999;
    }
    .app-view {
      margin-top: 96px;
    }
  }
}
</style>
