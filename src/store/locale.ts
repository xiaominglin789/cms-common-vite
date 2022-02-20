import { CONST_APP_LANGUAGE_KEY } from '@/constant/system'
import i18n from '@/plugins/i18n'
import { LocalStorageHelper } from '@/utils/storage'
import { defineStore } from 'pinia'
import { readonly } from 'vue'
import { EnumStoreID } from './store-id-enum'

/** 系统语言状态控制管理器 */
const useLocaleStore = defineStore(EnumStoreID.localeStore, {
  state: () => {
    return {
      /** 当前系统语言名,默认:zh-cn */
      currentLang: LocalStorageHelper.get(CONST_APP_LANGUAGE_KEY) || 'zh-cn',
      /** 系统配置的语言包名<key,value> */
      langsRecord: readonly({
        'zh-cn': '中文',
        en: 'English'
      })
    }
  },
  getters: {
    /** 当前系统语言数据信息对象 */
    currentLocale (): any {
      return i18n.global.messages[i18n.global.locale]
    }
  },
  actions: {
    /**
     * 切换系统语言
     * @param language
     * @returns true: 设置成功； false: 设置失败
     */
    setLanguage (language: string): boolean {
      if (!Object.keys(this.langsRecord).includes(language)) return false

      // 更换i18的语言,本地缓存
      this.currentLang = language
      i18n.global.locale = language
      LocalStorageHelper.set(CONST_APP_LANGUAGE_KEY, language)

      return true
    },
    /** 提供-取消息的方法 */
    msg (key: string): string {
      return i18n.global.t(key)
    }
  }
})

export { useLocaleStore }
