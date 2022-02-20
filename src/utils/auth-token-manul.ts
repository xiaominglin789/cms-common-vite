import {
  CONST_SYS_CHECK_TOKEN_EXPIRE_IN_MANUAL,
  CONST_SYS_LOGIN_TIME_KEY,
  CONST_SYS_LOGIN_TOKEN_EXPIRE_OUT
} from '@/constant/system'
import { getCurrentTimeStamp } from '@/utils/utils'
import { LocalStorageHelper } from './storage'

/**
 * 前端主动处理token失效拦截<需确保前后端失效时长一致>
 */
export class AuthManualTokenExpireIn {
  /** 手动处理是否开启, true 开启, false 不开启 */
  public static isOpenManua = CONST_SYS_CHECK_TOKEN_EXPIRE_IN_MANUAL()

  /** 用户上次登录的时间:ms */
  private static loginTime: number = Number(
    LocalStorageHelper.get(CONST_SYS_LOGIN_TIME_KEY) || 0
  )

  /** 本地制定的失效时长:ms */
  private static expireInTime: number = CONST_SYS_LOGIN_TOKEN_EXPIRE_OUT || 0

  /** 记录登录时间 */
  public static saveCurrentLoginTime (): void {
    AuthManualTokenExpireIn.loginTime = getCurrentTimeStamp()
    LocalStorageHelper.set(
      CONST_SYS_LOGIN_TIME_KEY,
      AuthManualTokenExpireIn.loginTime
    )
  }

  /** 校验是否失效: true->已失效 false->未失效 */
  public static checkTokenIsExpireIn = (): boolean => {
    if (!AuthManualTokenExpireIn.loginTime) return false

    const is =
      getCurrentTimeStamp() - AuthManualTokenExpireIn.loginTime >=
      AuthManualTokenExpireIn.expireInTime

    return is
  }
}
