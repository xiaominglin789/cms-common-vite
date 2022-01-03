/** 登录页的路由地址 */
export const CONST_ROUTER_LOGIN =
  String(import.meta.env.VITE_APP_ROUTER_LOGIN) || '/login'

/** 登录后跳转的第一个路由 */
export const CONST_ROUTER_LOGINED_FIRST =
  String(import.meta.env.VITE_APP_ROUTER_LOGINED_FIRST) || '/'

/** 令牌刷新的请求地址 */
export const CONST_REFRESH_TOKEN_URL = String(
  import.meta.env.VITE_APP_REFRESH_TOKEN_URL
)

/** 是否使用前端定义的错误信息: false 默认,不使用<使用后端错误信息> true 使用前端信息 */
export const CONST_SYS_USE_CLIENT_ERROR_MESSAGE = () => {
  if (
    String(
      import.meta.env.VITE_APP_SYS_USE_CLIENT_ERROR_MESSAGE
    ).toLocaleLowerCase() == 'false'
  ) {
    return false
  }
  if (
    String(
      import.meta.env.VITE_APP_SYS_USE_CLIENT_ERROR_MESSAGE
    ).toLocaleLowerCase() == 'true'
  ) {
    return true
  }
  return false
}

/** 是否启用本地手动校验令牌机制: false 默认不开启， true 开启 */
export const CONST_SYS_CHECK_TOKEN_EXPIRE_IN_MANUAL = () => {
  if (
    String(
      import.meta.env.VITE_APP_SYS_CHECK_TOKEN_EXPIRE_IN_MANUAL
    ).toLowerCase() == 'false'
  ) {
    return false
  }
  if (
    String(
      import.meta.env.VITE_APP_SYS_CHECK_TOKEN_EXPIRE_IN_MANUAL
    ).toLowerCase() == 'true'
  ) {
    return true
  }
  return false
}

/** 用户上次登录时间缓存键 */
export const CONST_SYS_LOGIN_TIME_KEY =
  String(import.meta.env.VITE_APP_SYS_LOGIN_TIME_KEY) || 'pre-login-time'

/** token主动处理: 约定的登录后token失效时长:ms */
export const CONST_SYS_LOGIN_TOKEN_EXPIRE_OUT = Number(
  import.meta.env.VITE_APP_SYS_LOGIN_TOKEN_EXPIRE_OUT || 0
)

/** token 2个令牌是否自动续签: false 默认只刷新access_token; true 刷新时全部刷新 */
export const CONST_SYS_TOKEN_AUTOMATIC_RENEWAL = () => {
  if (
    String(
      import.meta.env.VITE_APP_SYS_TOKEN_AUTOMATIC_RENEWAL
    ).toLowerCase() == 'false'
  ) {
    return false
  }
  if (
    String(
      import.meta.env.VITE_APP_SYS_TOKEN_AUTOMATIC_RENEWAL
    ).toLowerCase() == 'true'
  ) {
    return true
  }
  return false
}

/** 系统名称 */
export const CONST_APPLICATION_NAME =
  String(import.meta.env.VITE_APP_APPLICATION_NAME) || ''
/** 系统远程logo */
export const CONST_APPLICATION_WEB_LOGO =
  String(import.meta.env.VITE_APP_APPLICATION_WEB_LOGO) || ''
