/** access_token-key */
export const CONST_TOKEN_KEY =
  String(import.meta.env.VITE_APP_TOKEN_KAY) || 'access_token'

/** refresh_token-key */
export const CONST_REFRESH_TOKEN_KEY =
  String(import.meta.env.VITE_APP_REFRESH_TOKEN_KEY) || 'refresh_token'

/** 登录页的路由地址 */
export const CONST_ROUTER_LOGIN =
  String(import.meta.env.VITE_APP_ROUTER_LOGIN) || '/login'

/** 登录后跳转的第一个路由 */
export const CONST_ROUTER_LOGINED_FIRST =
  String(import.meta.env.VITE_APP_ROUTER_LOGINED_FIRST) || '/'
