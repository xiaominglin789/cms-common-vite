<template>
  <div class="nav-bar">
    <div class="left-nav">
      <side-bar-opened class="btn-side-opened"></side-bar-opened>
      <breadcrumb class="breadcrumb"></breadcrumb>
    </div>
    <div class="right-nav">
      <el-dropdown trigger="hover">
        <div class="avatar-box">
          <!-- 圆角头像 -->
          <el-avatar shape="circle" :size="30" :src="userAvatar"></el-avatar>
        </div>
        <!-- 头像下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/">首页</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a
                target="__blank"
                href="https://github.com/xiaominglin789/cms-common-vite"
                >Github仓库</a
              >
            </el-dropdown-item>
            <el-dropdown-item @click="onLogout" divided>
              退出登录
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

.nav-bar {
  @include flexRow(space-between, center);
  width: 100%;
  height: 60px;
  overflow: hidden;
  padding: 0 16px 0 4px;
  box-shadow: 0px 1px 1px #bfcbd9;

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
      transition: background-color 0.3s;
    }
    .btn-side-opened:hover {
      background-color: #e3e3e3;
    }
  }

  .right-nav {
    .el-avatar {
      --el-avatar-bg-color: none;
      box-shadow: 1px 2px 4px grey;
    }
  }
}
</style>
