/** 员工信息 */
export interface UserListType {
  id: number
  nickname: string
  roles: string[]
  actions: string[]
  avatar: string
  create_time: number
  update_time: number
  mobble: string
}

/** 员工列表响应数据结构 */
export interface UserListResponse {
  page: number
  size: number
  total: number
  list: Array<UserListType>
}
