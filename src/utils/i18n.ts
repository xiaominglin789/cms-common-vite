import { useLocaleStore } from '@/store/locale'

const { msg } = useLocaleStore()
/** 输出: 动态menu菜单的title */
export function popRouteMenuTitle(title: string) {
  return msg('route.' + title)
}
