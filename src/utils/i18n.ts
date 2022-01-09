import { useLocaleStore } from '@/store/locale'

const { msg } = useLocaleStore()

/** 输出: menu菜单的title键名取出语言包对应的实际文本 */
export function generalRouteMenuTitle(title: string) {
  return msg('route.' + title)
}
