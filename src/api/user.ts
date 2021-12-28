import { get, post } from '@/utils/request/service'
import {
  UserInformation,
  UserLoginRequest,
  UserLoginResponse
} from '@/utils/interfaces/user'

/**
 * 登录接口
 * @param userInfo
 * @returns
 */
export const userLogin = async (userInfo: UserLoginRequest) => {
  return post<UserLoginResponse>('/user/login', userInfo)
}

/**
 * 获取用户信息
 */
export const getUserInformation = async () =>
  get<UserInformation>('/user/information')
