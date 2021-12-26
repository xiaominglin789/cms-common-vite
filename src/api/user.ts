import { get, post } from '@/utils/request/service'
import { UserLoginRequest, UserLoginResponse } from '@/utils/interfaces/user'
import { ResponseType } from '@/utils/interfaces/response'

/**
 * 登录接口
 * @param userInfo
 * @returns
 */
export const userLogin = async (userInfo: UserLoginRequest) => {
  // console.log(userInfo)
  return post<ResponseType<UserLoginResponse>>('/user/login', userInfo)
}
