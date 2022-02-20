<template>
  <div class="tags-view">
    <router-link
      class="tags-view-item"
      v-for="(tag, index) in tagsList"
      :key="tag.fullPath"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      @contextmenu.prevent.stop="onTextMenu($event, index)"
    >
      <span>{{ tag.title }}</span>
      <span
        v-show="!isActive(tag)"
        class="css-close"
        @click.prevent.self="onClickClosed(index)"
      />
    </router-link>
    <!-- TagsViewMenu -->
    <tags-view-menu
      v-show="isOpenTextMenu"
      :index="selectTagsViewIndex"
      :style="menuStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore } from '@/store/system'
import { canSaveToTagsViewRecord } from '@/utils/tags-view'
import { generalRouteMenuTitle, languageSwitchMonitor } from '@/utils/i18n'
import TagsViewMenu from './TagsViewMenu.vue'

const isOpenTextMenu = ref(false)
const selectTagsViewIndex = ref(-1)
const menuStyle = ref({
  top: '0',
  left: '0'
})
/** 监听点击右键 */
const onTextMenu = (e: MouseEvent, index: number) => {
  const { x, y } = e
  menuStyle.value = {
    left: x + 'px',
    top: y + 'px'
  }
  isOpenTextMenu.value = true
  selectTagsViewIndex.value = index
}

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
const onClickClosed = (index: number) => {
  systemStore.removeTagsViewRecord({
    type: 'index',
    index
  })
}

/** 控制隐藏tagsviewMenu */
const hideTagsViewMenu = () => {
  isOpenTextMenu.value = false
}

/** 如果语言切换了,触发tagsView的刷新事件: 主要是切换title的国际化 */
languageSwitchMonitor(() => {
  tagsList.value.forEach((item, index) => {
    systemStore.refreshTagsViewRecordItem({
      index,
      tag: {
        ...item,
        title: getRouteTitle(item)
      }
    })
  })
})

/** 监听 isOpenTextMenu 状态-控制面板隐藏 */
watch(isOpenTextMenu, (val) => {
  if (val) {
    document.addEventListener('click', hideTagsViewMenu)
  } else {
  }
})
</script>

<style lang="scss" scoped>
.tags-view {
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 10px;
  box-shadow: 0 1px 2px grey;

  a:active,
  a:hover {
    color: none;
  }
  .tags-view-item {
    position: relative;
    width: auto;
    height: 28px;
    border: 1px solid blue;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border-radius: 4px;
    text-decoration: none;
    span {
      padding: 6px;
      cursor: pointer;
    }
    .css-close {
      width: 8px;
      height: 8px;
      position: relative;
      z-index: 1;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
      border-radius: 50%;
      box-sizing: border-box;
    }
    .css-close:hover {
      border: 1px solid red;
      border-radius: 50%;
      &::before {
        background-color: red;
      }
      &::after {
        background-color: red;
      }
    }
    .css-close::before {
      content: '';
      width: 100%;
      height: 1px;
      background-color: grey;
      position: absolute;
      z-index: 0;
      transform: rotate(45deg);
    }
    .css-close::after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: grey;
      position: absolute;
      z-index: 0;
      transform: rotate(-45deg);
    }
    &.active {
      background-color: #eff;
    }
  }
}
</style>
