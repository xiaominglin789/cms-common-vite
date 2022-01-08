/** 模糊搜索-数据源的数据结构 */
export interface FuseSearchPoolDataType {
  path: string
  title: string[]
}

/** 模糊搜索返回的数据结构 */
export interface FuseSearchResultDataType {
  item: FuseSearchPoolDataType
  refIndex: number
}
