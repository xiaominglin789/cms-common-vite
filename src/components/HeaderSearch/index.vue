<template>
  <div class="header-search">
    <div @click="onShowInput">
      <svg-icon :size="size" :icon="icon"></svg-icon>
    </div>
    <!-- 选择器 -->
    <el-select
      v-show="isShowInput"
      ref="searchSelectRef"
      class="search-select"
      v-model="searchValue"
      filterable
      remote
      :remote-method="querySelect"
      default-first-option
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="item in 3"
        :key="item"
        label="123132"
        :value="item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

/** 是否显示输入栏 */
const isShowInput = ref(false)
const searchValue = ref('')
const searchSelectRef = ref()

/** 控制输入栏的显示或隐藏 */
const onShowInput = () => {
  isShowInput.value = !isShowInput.value
}

/** 搜索 */
const querySelect = () => {
  console.log('xxxxxxxxxxx')
}

/** 选中option的回调 */
const onSelectChange = () => {
  console.log('激活选中')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.header-search {
  border: 1px solid red;
  cursor: pointer;
  width: 100%;
  @include flexRow(center, center);
  .search-select {
    margin-left: 12px;
  }
}
</style>
