<template>
  <div v-if="src" class="logo-container">
    <div class="logo-avatar">
      <el-avatar :size="size" :shape="shape" :src="src"></el-avatar>
    </div>
    <div v-show="opened" class="logo-title">
      <h1 v-if="title">{{ title }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/system'
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 44
  },
  shape: {
    type: String,
    default: 'circle'
  }
})
const systemStore = useSystemStore()
const opened = computed(() => systemStore.sideBarOpen)
const avatarWidth = computed(() => props.size + 10 + 'px')
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.logo-container {
  width: 100%;
  height: 60px;
  display: flex;
  cursor: pointer;
  .logo-avatar {
    flex: 0 0 v-bind(avatarWidth);
    display: flex;
    justify-content: center;
    align-items: center;
    .el-avatar {
      --el-avatar-bg-color: none;
      box-shadow: 1px 2px 4px #eea1a1;
    }
  }
  .logo-title {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 10px 0 10px;
    h1 {
      color: #fff;
      font-weight: 600;
      @include ellipsis(2);
    }
  }
}
</style>
