import { useLocaleStore } from '@/store/locale'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const localeStore = useLocaleStore()
const { currentLang } = storeToRefs(localeStore)

/** 输出: menu菜单的title键名取出语言包对应的实际文本 */
export function generalRouteMenuTitle(title: string) {
  return localeStore.msg('route.' + title)
}

/**
 * 语言切换的监听器
 * @param funs 事件集
 */
export const languageSwitchMonitor = (...funs: Function[]) => {
  watch(currentLang, () => {
    // 语言切换了,触发传入的事件回调
    funs.forEach((fun) => fun())
  })
}
