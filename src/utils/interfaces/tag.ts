/** 路由标签导航记录数据结构 */
export interface TagsViewType {
  fullPath: string
  path: string
  meta: any
  title: string
  name: string
  params: any
  query: any
}

/** 移除tag的数据结构 */
export interface RemoveTagPayload {
  /**
   * type:left 移除index后侧的
   * type:other 移除除index以外的
   * type:index 移除index当前
   */
  type: 'right' | 'other' | 'index'
  index: number
}
