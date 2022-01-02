import { RouteRecordRaw } from 'vue-router'

/** 处理路由转菜单 */
export class RouteHelper {
  /** 检测Raw是否为空值 */
  private static checkIsNull(route: any) {
    if (!route) return true
    if (JSON.stringify(route) === '{}') return true
    if (JSON.stringify(route) === '') return true
  }

  /** 获取子级路由 */
  private static getChildrenRoutes(routes: RouteRecordRaw[]) {
    const result = <RouteRecordRaw[]>[]
    routes.forEach((route) => {
      if (route.children && route.children.length > 0) {
        result.push(...route.children)
      }
    })
    return result
  }

  /** 过滤不重复的路由表: 脱离层级的路由 + 带有子路由的顶层路由 */
  public static filterRoutes(routes: RouteRecordRaw[]) {
    const childRoutes = RouteHelper.getChildrenRoutes(routes)
    return routes.filter((route) => {
      return !childRoutes.find((item) => {
        return item.path === route.path
      })
    })
  }

  /**
   * 路由Menu结构
   *  - 路由menu规则: (meta.title && meta.icon) ==> 展示菜单
   *  - 过滤后的路由表根据menu规则,转成menu所需结构
   * @param routes 过滤后的路由表
   */
  public static routeToMenu(routes: RouteRecordRaw[], basePath = '') {
    const result = <any[]>[]

    routes.forEach((item) => {
      // [children 不存在, mete不存在, return]
      if (this.checkIsNull(item.children) && this.checkIsNull(item.meta)) return

      // [children 存在, meta 不存在， 递归子项]
      if (!this.checkIsNull(item.children) && this.checkIsNull(item.meta)) {
        item.children && result.push(...this.routeToMenu(item.children))
        return
      }

      // [不存在chilren,但存在meta] || [存在chilren,存在meta] 判断保存数据
      // 合并路由路径
      //  避免嵌套路由路径没有写全的情况:
      //   - /user
      //    - /info/:id (应该写全:/user/info/:id)
      let routePath = basePath + item.path
      routePath = routePath.replace(basePath, '')

      // 判断是否当前路由是否以及保存进menu数组中
      let route: any = result.find((item) => item.path === routePath)
      if (!route) {
        // 构建menu项结构
        route = {
          ...item,
          path: routePath,
          children: <RouteRecordRaw[]>[]
        }

        // 判断当前路由是否符合加入menu数组的规则
        if (item.meta?.title && item.meta?.icon) {
          result.push(route)
        }
      }

      // [存在children, 存在meta, 保存子路由]
      if (!this.checkIsNull(item.children)) {
        item.children &&
          route.children.push(...this.routeToMenu(item.children, route.path))
      }
    })

    return result
  }
}

export default RouteHelper
