import { createI18n } from 'vue-i18n'
// 导入element-plus需要用到的语言包
import zhcnLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'
// 自定义的语言包
import zhcnApp from './langs/zh-ch'
import enApp from './langs/en'
import { CONST_APP_LANGUAGE_KEY } from '@/constant/system'
import { LocalStorageHelper } from '@/utils/storage'

/** 配置完整数据源 */
const messages = {
  [zhcnLocale.name]: {
    // name + el ->解决element的语言切换
    name: zhcnLocale.name,
    el: zhcnLocale.el,
    ...zhcnApp
  },
  [enLocale.name]: {
    // name + el ->解决element的语言切换
    name: enLocale.name,
    el: enLocale.el,
    ...enApp
  }
}

const i18n = createI18n({
  // 初始化时的语言，默认-默认
  locale: LocalStorageHelper.get(CONST_APP_LANGUAGE_KEY) || zhcnLocale.name,
  fallbackLocale: zhcnLocale.name,
  messages
})

export default i18n
