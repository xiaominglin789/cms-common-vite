<template>
  <ul class="tags-view-menu">
    <li @click="onMenuRefresh">{{ $t('sys.menuRefresh') }}</li>
    <li @click="onMenuCloseRight">{{ $t('sys.menuCloseRight') }}</li>
    <li @click="onMenuCloseOther">{{ $t('sys.menuCloseOther') }}</li>
  </ul>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/system'
import { useRouter } from 'vue-router'

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const router = useRouter()
const systemStore = useSystemStore()

/** 页面自刷新 */
const onMenuRefresh = () => {
  router.go(0)
}
/** 关闭右侧tags */
const onMenuCloseRight = () => {
  systemStore.removeTagsViewRecord({
    type: 'right',
    index: props.index
  })
}
/** 关闭其他tags */
const onMenuCloseOther = () => {
  systemStore.removeTagsViewRecord({
    type: 'other',
    index: props.index
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.tags-view-menu {
  width: 110px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 2px 4px 8px #666;
  @include flexColumn(center, center);
  background-color: #fff;
  color: #666;
  box-sizing: border-box;
  position: fixed;
  z-index: 999;
  li {
    width: 100%;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    opacity: 1;
    font-size: 12px;
    &:hover {
      opacity: 0.9;
      background-color: #eee;
    }
  }
}
</style>
