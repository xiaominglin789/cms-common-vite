<template>
  <div class="com nav-bar">
    <div class="left-nav">
      <span class="show-menu-btn" @click="onTriggerMenu">
        <svg-icon
          :icon="isTriggerMenu ? 'hamburger-opened' : 'hamburger-closed'"
        />
      </span>
    </div>
    <div class="right-nav">
      <el-dropdown>
        <div style="cursor: pointer">下拉菜单</div>
        <div class="avatar-swrapper">
          <!-- <el-avatar :size="50" :src="avatarUrl"></el-avatar> -->
          {{ userAvatar }}
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>1</el-dropdown-item>
            <el-dropdown-item>1</el-dropdown-item>
            <el-dropdown-item>1</el-dropdown-item>
            <el-dropdown-item>1</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { UserInformation } from '@/utils/interfaces/user'

const userStore = useUserStore()
const isTriggerMenu = ref(true)
const userAvatar = computed(() => userStore.userInfo.avatar)

const onTriggerMenu = () => {
  console.log('ggggggggggggg')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.nav-bar {
  @include flexRow(space-between, center);
  width: 100%;
  height: 60px;
  padding: 0 16px 0 4px;
  .left-nav {
    .show-menu-btn {
      display: inline-block;
      width: 32px;
      height: 32px;
      @include flexRow(center, center);
    }
  }
}
</style>
