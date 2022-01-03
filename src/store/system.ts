import { defineStore } from 'pinia'
import { EnumStoreID } from './store-id-enum'
import cssVariables from '@/styles/variables.module.scss'

/** 系统配置状态*/
export const useSystemStore = defineStore(EnumStoreID.systemStore, {
  state: () => {
    return {
      /** 侧边栏menu显示隐藏开关 */
      sideBarOpen: true,
      /** scss-module-动态属性js访问: cssVars.xxx */
      cssVars: cssVariables
    }
  },
  actions: {
    /** 触发-侧边栏显示隐藏开关,每次触发取反 */
    triggerSideBarOpened() {
      this.sideBarOpen = !this.sideBarOpen
    }
  }
})
