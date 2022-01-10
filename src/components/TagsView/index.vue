<template>
  <div class="tags-view">
    <router-link
      class="tags-view-item"
      v-for="(tag, index) in tagsList"
      :key="tag.fullPath"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
    >
      <span>{{ tag.title }}</span>
      <i
        v-show="!isActive(tag)"
        class="el-icon-close"
        @click.prevent.stop="onClickClosed(index)"
      ></i>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore } from '@/store/system'
import { canSaveToTagsViewRecord } from '@/utils/tags-view'
import { generalRouteMenuTitle, languageSwitchMonitor } from '@/utils/i18n'

const route = useRoute()
const systemStore = useSystemStore()
const tagsList = computed(() => systemStore.tagsViewRecord)

/** 根据传入的路由取出对应的title */
const getRouteTitle = (route: any) => {
  let title = ''

  if (!route.meta) {
    // 没有meta,则取取path分割的最后一个
    const latests = route.path.split('/')
    console.log(
      '没有meta,则取取path分割的最后一个: ',
      latests[latests.length - 1],
      route.path
    )
    return latests[latests.length - 1]
  } else {
    title = generalRouteMenuTitle(route.meta.title)
  }

  return title
}

/** 监听路由变化 */
watch(
  route,
  (to) => {
    if (!canSaveToTagsViewRecord(to.path)) return

    const { fullPath, path, meta, name, params, query } = to
    systemStore.addTagsViewRecord({
      fullPath,
      path,
      meta,
      title: getRouteTitle(to),
      name: String(name),
      params,
      query
    })
  },
  { immediate: true }
)

/** 当前路由和tags记录比较,判断是否激活哪一项 */
const isActive = (item: any) => {
  return item.path === route.path
}

/** 关闭tag的事件 */
const onClickClosed = (index: number) => {}

/** 如果语言切换了,触发tagsView的刷新事件: 主要是切换title的国际化 */
languageSwitchMonitor(() => {
  tagsList.value.forEach((item, index) => {
    systemStore.refreshTagsViewRecordItem({
      index,
      tag: {
        ...item,
        title: getRouteTitle(route)
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.tags-view {
  .tags-view-item {
    .el-icon-close {
    }
    &.active {
      color: red;
    }
  }
}
</style>
