/** 用户登录请求数据结构 */
export interface UserLoginRequest {
  username: string
  password: string
}

/** 用户登录响应数据结构 */
export interface UserLoginResponse {
  msg?: string
  token?: string
}
