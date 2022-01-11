import { defineStore } from 'pinia'
import { EnumStoreID } from './store-id-enum'
import cssVariables from '@/styles/variables.module.scss'
import { LocalStorageHelper } from '@/utils/storage'
import {
  CONST_APP_TAGS_VIEW,
  CONST_APP_THEME_COLOR_KEY
} from '@/constant/system'
import {
  CONST_APP_DARK_MODE_OPEN,
  CONST_APP_HEADER_FIXED_OPEN,
  CONST_APP_SIDE_BAR_OPEN
} from '@/constant/config'
import { generalStyle, writeNewStyle } from '@/utils/theme'
import { RemoveTagPayload, TagsViewType } from '@/utils/interfaces/tag'

/** 系统配置状态*/
export const useSystemStore = defineStore(EnumStoreID.systemStore, {
  state: () => {
    return {
      /** 是否开启黑夜模式 */
      darkModeOpen: false,
      /** 是否开启头部导航fixed定位 */
      headerFixedOpen: true,
      /** 侧边栏menu显示隐藏开关 */
      sideBarOpen: true,
      /** scss-module-动态属性js访问: cssVars.xxx */
      cssVars: cssVariables,
      /** 默认主题色 */
      themeColor: '',
      /** tagsView记录 */
      tagsViewRecord:
        (LocalStorageHelper.get(CONST_APP_TAGS_VIEW) as TagsViewType[]) ||
        <TagsViewType[]>[]
    }
  },
  getters: {
    headerFixedLeftPosition(): string {
      let _left = '0px'
      if (this.headerFixedOpen && this.sideBarOpen) {
        _left = this.cssVars.sideBarWith
      }
      if (this.headerFixedOpen && !this.sideBarOpen) {
        _left = this.cssVars.sideBarWithHide
      }
      return _left
    }
  },
  actions: {
    /** 配置初始化-用在App入口查询本地缓存初始化 */
    async systemConfigInit() {
      this.darkModeOpen =
        LocalStorageHelper.get(CONST_APP_DARK_MODE_OPEN) === true ? true : false
      this.headerFixedOpen =
        LocalStorageHelper.get(CONST_APP_HEADER_FIXED_OPEN) === true
          ? true
          : false
      this.sideBarOpen =
        LocalStorageHelper.get(CONST_APP_SIDE_BAR_OPEN) === true ||
        LocalStorageHelper.get(CONST_APP_SIDE_BAR_OPEN) === null
          ? true
          : false
      this.themeColor =
        LocalStorageHelper.get(CONST_APP_THEME_COLOR_KEY) === null
          ? ''
          : LocalStorageHelper.get(CONST_APP_THEME_COLOR_KEY)

      // 初始化主题色
      await this.changeThemeColor(this.themeColor)
      // 初始化黑夜模式状态
      this.changeDarkMode(this.darkModeOpen)
    },
    /** 触发-是否开启黑夜模式 */
    triggerDarkModeOpend() {
      this.darkModeOpen = !this.darkModeOpen
      LocalStorageHelper.set(CONST_APP_DARK_MODE_OPEN, this.darkModeOpen)
    },
    /** 触发-是否开启头部导航fixed定位 */
    triggerHeaderFixedOpend() {
      this.headerFixedOpen = !this.headerFixedOpen
      LocalStorageHelper.set(CONST_APP_HEADER_FIXED_OPEN, this.headerFixedOpen)
    },
    /** 触发-侧边栏显示隐藏开关,每次触发取反 */
    triggerSideBarOpened() {
      this.sideBarOpen = !this.sideBarOpen
      console.log(this.sideBarOpen)
      LocalStorageHelper.set(CONST_APP_SIDE_BAR_OPEN, this.sideBarOpen)
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
    },
    /** 添加 tags 路由标签导航记录 */
    addTagsViewRecord(tag: TagsViewType) {
      // 数组去重
      const has = this.tagsViewRecord.find((item: TagsViewType) => {
        return item.path === tag.path
      })

      // 不存在,保存
      if (!has) {
        this.tagsViewRecord.push(tag)
        // 更新本地缓存
        LocalStorageHelper.set(CONST_APP_TAGS_VIEW, this.tagsViewRecord)
      }
    },
    /**
     * 刷新TagsViewRecordItem
     *  - 更新tagsViewRecord
     *  - 更新本地缓存
     * @param newTagData
     */
    refreshTagsViewRecordItem(newTagData: {
      tag: TagsViewType
      index: number
    }) {
      const { tag, index } = newTagData
      this.tagsViewRecord[index] = tag

      LocalStorageHelper.set(CONST_APP_TAGS_VIEW, this.tagsViewRecord)
    },
    /**
     * 移除某项tagsView
     * @param payload
     */
    removeTagsViewRecord(payload: RemoveTagPayload) {
      const { type, index } = payload
      switch (type) {
        case 'other':
          this.tagsViewRecord.splice(0, index)
          this.tagsViewRecord.splice(
            index + 1,
            this.tagsViewRecord.length - (index + 1)
          )
          break
        case 'right':
          this.tagsViewRecord.splice(
            index + 1,
            this.tagsViewRecord.length - (index + 1)
          )
          break
        case 'index':
          this.tagsViewRecord.splice(index, 1)
          break
      }

      // 缓存修改后的结果
      LocalStorageHelper.set(CONST_APP_TAGS_VIEW, this.tagsViewRecord)
    },
    /**
     * 切换黑夜模式
     * @param toDark
     */
    changeDarkMode(toDark: boolean) {
      const body = document.documentElement
      if (toDark) {
        body.setAttribute('data-theme', 'dark')
      } else {
        body.setAttribute('data-theme', '')
      }
    }
  }
})
