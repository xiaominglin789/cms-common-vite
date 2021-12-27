import { post } from '@/utils/request/service'
import { UserLoginRequest, UserLoginResponse } from '@/utils/interfaces/user'

/**
 * 登录接口
 * @param userInfo
 * @returns
 */
export const userLogin = async (userInfo: UserLoginRequest) => {
  return post<UserLoginResponse>('/admin/login', userInfo)
}
