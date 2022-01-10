import { CONST_ROUTER_LOGIN } from '@/constant/system'

/** 路由标签导航-工具函数 */

/** 路由白名单列表 */
export const whiteRouteList = [CONST_ROUTER_LOGIN, '/404', '/401']

/** 传入路由地址判断是否能保存进tagsViewRecord中 - 路由白名单的路由不能保存 */
export const canSaveToTagsViewRecord = (path: string) => {
  return !whiteRouteList.includes(path)
}
