import Fuse from 'fuse.js'
import type { RouteRecordRaw } from 'vue-router'
import { useLocaleStore } from '@/store/locale'
import {
  FuseSearchPoolDataType,
  FuseSearchResultDataType
} from './interfaces/fuse'

/** 页面-模糊搜索工具类 */
class FuseHelper {
  private static instace: FuseHelper
  private fuseOptions: Fuse.IFuseOptions<any> = {
    /** 是否安装优先级今夕排序 */
    shouldSort: true,
    /** 最小匹配长度 */
    minMatchCharLength: 1,
    /** 权重-name:键名,weight:权重 */
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  }
  private fuseObj!: Fuse<FuseSearchPoolDataType>
  private localStore = useLocaleStore()

  private constructor(routeMenus: RouteRecordRaw[]) {
    const list = this.routeMenusProcessed(routeMenus)
    console.log(list)

    this.fuseObj = new Fuse<FuseSearchPoolDataType>(list, this.fuseOptions)
  }

  /** 路由菜单数据类型 转 模糊搜索需要的数据结构 */
  private routeMenusProcessed(
    routeMenus: RouteRecordRaw[],
    basePath = '/',
    prefixTitle = <string[]>[]
  ): any[] {
    let res: FuseSearchPoolDataType[] = []

    for (let menu of routeMenus) {
      // xxx
      let path = basePath + menu.path
      path = path.replace(basePath, '')

      const data: FuseSearchPoolDataType = {
        path,
        title: [...prefixTitle]
      }

      // 1.判断有meta时, 需要使用i18n做国际化解析,组合成新的title
      // 2.动态路由不允许被检索: regexp: /.*:.*/
      const reg = /.*:.*/
      if (menu.meta && menu.meta.title && !reg.exec(menu.path)) {
        const i18nTitle = this.localStore.msg(`route.${menu.meta.title}`)
        data.title = [...data.title, i18nTitle]
        res.push(data)
      }

      // 存在children 进行迭代
      if (menu.children) {
        const childResult = this.routeMenusProcessed(
          menu.children,
          data.path,
          data.title
        )
        if (childResult.length > 0) {
          res = [...res, ...childResult]
        }
      }
    }

    return res
  }

  public static getInstance(routeMenus: any) {
    if (!this.instace) {
      this.instace = new FuseHelper(routeMenus)
    }

    return this.instace
  }

  /**
   * 模糊搜索
   * @param query
   */
  public search(query: string): FuseSearchResultDataType[] {
    return this.fuseObj.search(query)
  }
}

export default FuseHelper
