import {
  CONST_ACCESS_TOKEN_KEY,
  CONST_REFRESH_TOKEN_KEY
} from '@/constant/user'
import { LocalStorageHelper } from './storage'

/** token操作器 */
class TokenHelper {
  /**
   * 保存token
   * @param accessToken
   * @param refreshToken
   */
  static saveToken (accessToken: string, refreshToken?: string): void {
    LocalStorageHelper.set(CONST_ACCESS_TOKEN_KEY, accessToken)
    LocalStorageHelper.set(CONST_REFRESH_TOKEN_KEY, refreshToken)
  }

  /**
   * 存储access_token
   * @param accessToken
   */
  static saveAccessToken (accessToken: string): void {
    LocalStorageHelper.set(CONST_ACCESS_TOKEN_KEY, accessToken)
  }

  /** 根据 键名 取对应的token */
  static getToken (constKey: string): string {
    return LocalStorageHelper.get(constKey)
  }

  /** 获取access_token缓存 */
  static getAccessToken (): string {
    return TokenHelper.getToken(CONST_ACCESS_TOKEN_KEY)
  }

  /** 获取refress_token缓存 */
  static getRefreshToken (): string {
    return TokenHelper.getToken(CONST_REFRESH_TOKEN_KEY)
  }

  /** 移除token */
  static removeToken () {
    LocalStorageHelper.remove(CONST_ACCESS_TOKEN_KEY)
    LocalStorageHelper.remove(CONST_REFRESH_TOKEN_KEY)
  }
}

export default TokenHelper
