<template>
  <div class="dynamic-theme">
    <el-dropdown trigger="click">
      <svg-icon :size="size" :icon="icon"></svg-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="openDialog">
            <span>更换主题色</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 弹窗 -->
    <el-dialog
      title="系统主题色"
      v-model="opend"
      @close="closeDialog"
      :modal="true"
    >
      <!-- 取色器 -->
      <div class="color-box">
        <span>更换主题色</span>
        <el-color-picker
          v-model="selectColor"
          :predefine="predefineColors"
        ></el-color-picker>
      </div>
      <template #footer>
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="themeColorChange">Confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/system'
import { ref } from 'vue'
import { generalStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  size: {
    type: Number,
    default: 24
  },
  icon: {
    type: String,
    default: 'change-theme'
  }
})

const systemStore = useSystemStore()
const opend = ref(false)
const selectColor = ref(systemStore.themeColor)
/** 颜色预值 */
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#90ee90',
  '#00ced1',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])

/** 打开弹窗 */
const openDialog = () => {
  opend.value = true
}
/** 关闭弹窗 */
const closeDialog = () => {
  opend.value = false
}
/** 主题颜色切换处理 */
const themeColorChange = async () => {
  // 完成切换逻辑
  if (selectColor.value === systemStore.themeColor) {
    closeDialog()
    return
  }

  const newStyle = await generalStyle(selectColor.value)
  writeNewStyle(newStyle)
  systemStore.saveThemeColor(selectColor.value)
  closeDialog()
}
</script>

<style lang="scss" scoped>
.dynamic-theme {
  width: 20%;
  :deep(.color-box) {
    display: flex;
    align-items: center;
    span {
      margin-right: 4px;
    }
  }
}
</style>
