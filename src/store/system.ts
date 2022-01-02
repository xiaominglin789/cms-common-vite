import { defineStore } from 'pinia'
import { EnumStoreID } from './store-id-enum'

/** 系统配置状态*/
export const useSystemStore = defineStore(EnumStoreID.systemStore, {
  state: () => {
    return {
      /** 侧边栏menu显示隐藏开关 */
      sideBarOpen: true
    }
  },
  actions: {
    /** 触发-侧边栏显示隐藏开关,每次触发取反 */
    triggerSideBarOpened() {
      this.sideBarOpen = !this.sideBarOpen
    }
  }
})
