import { useAESEncrypt, useBase64Encrypt } from '@/utils/crypto'

/**
 * 用户账号密码加密
 * 根据需求使用不同加密组合
 * username: aes-256-cbc 加密
 * password: aes-256-cbc(base64) 加密
 */
export function useUserInfoCryptoEncode() {
  const doUsenameEncode = (username: string) => {
    return useAESEncrypt(username)
  }

  const doPasswordEncode = (password: string) => {
    return useAESEncrypt(useBase64Encrypt(password))
  }

  return {
    doUsenameEncode,
    doPasswordEncode
  }
}
