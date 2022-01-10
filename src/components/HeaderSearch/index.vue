<template>
  <div class="header-search" :class="{ 'show-search': isShowSearch }">
    <div @click.stop="onClickSeachIcon">
      <svg-icon :size="size" :icon="icon"></svg-icon>
    </div>
    <!-- 选择器 -->
    <el-select
      ref="searchSelectRef"
      class="search-select"
      v-model="searchValue"
      filterable
      remote
      :remote-method="querySelect"
      default-first-option
      :placeholder="$t('sys.menuFuseTip')"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import {
  FuseSearchResultDataType,
  FuseSearchPoolDataType
} from '@/utils/interfaces/fuse'
import { useI18n } from 'vue-i18n'
import routeHelper from '@/utils/routeHelper'
import FuseHandler from '@/utils/fuseHandler'

defineProps({
  size: {
    type: Number,
    default: 24
  },
  icon: {
    type: String,
    default: 'search'
  }
})

const i18n = useI18n()
const router = useRouter()
/** 是否显示搜索栏 */
const isShowSearch = ref(false)
/** 搜索结果 */
const searchValue = ref<FuseSearchPoolDataType>()
/** 模糊搜索结果集 */
const searchOptions = ref(<FuseSearchResultDataType[]>[])
/** 组件绑定 */
const searchSelectRef = ref()

/** 模糊搜索类实例 */
let fuseHelperObj!: FuseHandler

onBeforeMount(() => {
  initFuseSearchClass()
})

/** 模糊搜索类实例化 */
const initFuseSearchClass = () => {
  /** menu数据源 */
  const routes = routeHelper.filterRoutes(router.getRoutes())
  const menus = routeHelper.routeToMenu(routes)

  fuseHelperObj = new FuseHandler(menus)
}

/** 点击搜索按钮触发事件 */
const onClickSeachIcon = () => {
  isShowSearch.value = !isShowSearch.value
}

/** 进行搜索 */
const querySelect = (query: string) => {
  if (!query) return

  searchOptions.value = fuseHelperObj.search(query)
}

/** 选中option的回调,跳转到对应的路由 */
const onSelectChange = () => {
  searchValue.value && router.push(searchValue.value.path)
}

/** 关闭搜索 */
const closedSelectContent = () => {
  nextTick(() => {
    searchSelectRef.value.blur()
    isShowSearch.value = false
    searchOptions.value = []
    searchValue.value = undefined
  })
}

/** 监听页面点击,关闭搜索面板,清空搜索结果 */
watch(isShowSearch, (val) => {
  nextTick(() => {
    if (val) {
      searchSelectRef.value.focus()
      document.body.addEventListener('click', closedSelectContent)
    } else {
      document.body.removeEventListener('click', closedSelectContent)
    }
  })
})

/** 监听语言切换,模糊搜索重新初始化 */
watch(i18n.locale, (val) => {
  initFuseSearchClass()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.header-search {
  width: 100%;
  @include flexRow(center, center);
  .search-select {
    display: none;
    width: 0;
    transition: width 0.2s;
  }

  &.show-search {
    .search-select {
      display: inline-block;
      width: 200px;
      margin-left: 12px;
    }
  }
}
</style>
