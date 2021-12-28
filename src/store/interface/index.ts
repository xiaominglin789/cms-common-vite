/** 顶级类型声明 */
export interface RootStateTypes {
  userState: UserStateTypes
}

/** 用户信息数据类型 */
export interface UserStateTypes {
  token: string
  userInfo: {}
}
