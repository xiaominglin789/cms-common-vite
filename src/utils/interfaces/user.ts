/** 用户登录请求数据结构 */
export interface UserLoginRequest {
  username: string
  password: string
}

/** 用户登录响应数据结构 */
export interface UserLoginResponse {
  access_token: string
  refresh_token?: string
}

/** 用户信息数据结构(用户基本信息+用户角色+用户可用菜单) */
export interface UserInformation {
  nickname: string
  role: Array<string>
  permission: {
    menus: Array<string>
    points: Array<string>
  }
  avatar?: string
}
