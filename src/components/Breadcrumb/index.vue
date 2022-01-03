<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(child, index) in breadcrumbArray"
          :key="child.path"
        >
          <!-- 不可点击 -->
          <span
            v-if="index === breadcrumbArray.length - 1"
            class="no-redirect"
            >{{ child.meta.title }}</span
          >
          <!-- 可点击,触发class动画 -->
          <span v-else class="redirect" @click="onLinkHanlder(child)">{{
            child.meta.title
          }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const breadcrumbArray = ref(<RouteLocationMatched[]>[])

const generalBreadcrumbData = (routes: RouteLocationMatched[]) => {
  breadcrumbArray.value = routes.filter((item) => item.path && item.meta.title)
}

// 监听路由变化
watch(
  route,
  () => {
    generalBreadcrumbData(route.matched)
  },
  { immediate: true }
)

const onLinkHanlder = (item: RouteLocationMatched) => {
  console.log('切换link', item)
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.breadcrumb-container {
  display: inline-block;
  font-size: 14px;
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }
  .redirect:hover {
    color: $menuBg;
  }
  :deep(.no-redirect) {
    color: #aaa;
    cursor: text;
  }
}
</style>
