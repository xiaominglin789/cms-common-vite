/** access_token-key */
export const CONST_ACCESS_TOKEN_KEY =
  String(import.meta.env.VITE_APP_ACCESS_TOKEN_KAY) || 'access_token'

/** refresh_token-key */
export const CONST_REFRESH_TOKEN_KEY =
  String(import.meta.env.VITE_APP_REFRESH_TOKEN_KEY) || 'refresh_token'

/** 用户信息缓存-key */
export const CONST_USER_INFO_KEY =
  String(import.meta.env.VITE_APP_USER_INFO_KEY) || 'user'
