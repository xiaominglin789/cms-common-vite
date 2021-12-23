import { get, post } from '@/utils/request/service'
import { UserLoginRequest, UserLoginResponse } from '@/utils/interfaces/user'

/**
 * 登录接口
 * @param userInfo
 * @returns
 */
export const userLogin = (userInfo: UserLoginRequest) => {
  // console.log(userInfo)
  return post<UserLoginResponse>('/user/login', userInfo)
}
