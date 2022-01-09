<template>
  <el-dropdown
    class="app-language"
    :style="{ 'background-color': bgColor }"
    @command="onChangeLanguage"
    trigger="click"
  >
    <svg-icon :size="size" :icon="icon"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(value, key, i) in langsRecord"
          :key="key"
          :command="key"
          :divided="i > 0 ? true : false"
          :disabled="key === currentLang ? true : false"
        >
          {{ value }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useLocaleStore } from '@/store/locale'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'

defineProps({
  bgColor: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 24
  },
  icon: {
    type: String,
    default: 'language'
  }
})

const localeStore = useLocaleStore()
// setLanguage, msg, lang, langsRecord 方法和某些属性不需要保存响应式
const { setLanguage, msg, langsRecord } = localeStore
// 需要保存响应式,使用-storeToRefs 或 直接 localeStore.currentLang 使用
const { currentLang } = storeToRefs(localeStore)

const onChangeLanguage = (language: string) => {
  setLanguage(language) && ElMessage.success(msg('language.switchSuccuss'))
}
</script>

<style lang="scss" scoped></style>
