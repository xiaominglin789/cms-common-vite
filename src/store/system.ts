import { defineStore } from 'pinia'
import { EnumStoreID } from './store-id-enum'
import cssVariables from '@/styles/variables.module.scss'
import { LocalStorageHelper } from '@/utils/storage'
import { CONST_APP_THEME_COLOR_KEY } from '@/constant/system'
import { generalStyle, writeNewStyle } from '@/utils/theme'

/** 系统配置状态*/
export const useSystemStore = defineStore(EnumStoreID.systemStore, {
  state: () => {
    return {
      /** 侧边栏menu显示隐藏开关 */
      sideBarOpen: true,
      /** scss-module-动态属性js访问: cssVars.xxx */
      cssVars: cssVariables,
      /** 默认主题色 */
      themeColor: LocalStorageHelper.get(CONST_APP_THEME_COLOR_KEY) || '#409eff'
    }
  },
  actions: {
    /** 触发-侧边栏显示隐藏开关,每次触发取反 */
    triggerSideBarOpened() {
      this.sideBarOpen = !this.sideBarOpen
    },
    /** 修改主题色 */
    async changeThemeColor(color: string) {
      if (!color) return
      // 修改element-plus的主题色
      const newStyle = await generalStyle(color)
      writeNewStyle(newStyle)

      // 更换自定义的主题色
      this.cssVars.menuBg = color

      // 更新缓存
      this.themeColor = color
      LocalStorageHelper.set(CONST_APP_THEME_COLOR_KEY, color)
    }
  }
})
