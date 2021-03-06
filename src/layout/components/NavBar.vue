<template>
  <div class="nav-bar">
    <div class="left-nav">
      <side-bar-opened class="btn-side-opened" />
      <breadcrumb class="breadcrumb" />
    </div>
    <div class="right-nav">
      <!-- 页面引导 -->
      <app-guide class="right-nav-item" />
      <!-- 页面搜索 -->
      <header-search class="right-nav-item" />
      <!-- 换肤 -->
      <dynamic-theme class="right-nav-item" />
      <!-- 国际化 -->
      <app-language class="right-nav-item" />
      <!-- 全屏 -->
      <screenfull class="right-nav-item" />
      <!-- 头像 -->
      <el-dropdown
        trigger="hover"
        class="right-nav-item"
      >
        <div class="avatar-box">
          <!-- 圆角头像 -->
          <el-avatar
            shape="circle"
            :size="30"
            :src="userAvatar"
          />
        </div>
        <!-- 头像下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/">
                {{ $t('sys.home') }}
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a
                target="__blank"
                href="https://github.com/xiaominglin789/cms-common-vite"
              >{{ $t('sys.github') }}</a>
            </el-dropdown-item>
            <el-dropdown-item
              @click="onLogout"
              divided
            >
              {{ $t('sys.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/store/user'
import userAvatarDefualt from '@/assets/logo.png'
import SideBarOpened from '@/components/SideBarOpened/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import AppLanguage from '@/components/AppLanguage/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import DynamicTheme from '@/components/DynamicTheme/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import AppGuide from '@/components/AppGuide/index.vue'

const userStore = useUserStore()
const isTriggerMenu = ref(true)
const userAvatar = computed(
  () => userStore.userInfo.avatar || userAvatarDefualt
)

const onTriggerMenu = () => {
  isTriggerMenu.value = !isTriggerMenu.value
}

/** 点击退出登录 */
const onLogout = async () => {
  await userStore.logout()
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.nav-bar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  padding: 0 16px 0 4px;
  box-shadow: 0px 1px 1px #bfcbd9;
  @include flexRow(space-between, center);
  .left-nav {
    display: flex;
    align-items: center;
    .breadcrumb {
      margin-left: 8px;
    }
    .btn-side-opened {
      cursor: pointer;
      padding: 2px;
      border-radius: 2px;
      transition: background-color #{$transitionTime_30} ease-in-out;
    }
    .btn-side-opened:hover {
      background-color: #e3e3e3;
    }
  }

  .right-nav {
    display: flex;
    gap: 16px;
    align-items: center;
    .right-nav-item {
      cursor: pointer;
    }
    .right-nav-item:hover {
      opacity: 0.9;
      :deep(.svg-icon) {
        transform: scale(0.9);
      }
    }
    .avatar-box {
      cursor: pointer;
      .el-avatar {
        --el-avatar-bg-color: none;
        box-shadow: 1px 2px 4px grey;
      }
    }
  }
}
</style>
