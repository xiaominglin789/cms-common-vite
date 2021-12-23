import { AES, enc, mode, pad } from 'crypto-js'

// aes-128-cbc-16
// AES-16位密钥
const AESKey = String(import.meta.env.VITE_APP_AESKEY32)
// AES-key-iv偏移钥
const AESIV = String(import.meta.env.VITE_APP_AESIV16)

/**
 * AES明文加密
 * @param msg 明文
 * @returns
 */
const useAESEncrypt = (msg: string) => {
  const skey = enc.Utf8.parse(AESKey)
  const srcs = enc.Utf8.parse(msg)
  const optiops = {
    iv: enc.Utf8.parse(AESIV),
    mode: mode.CBC,
    padding: pad.Pkcs7
  }

  const encrypted = AES.encrypt(srcs, skey, optiops)

  return encrypted.ciphertext.toString().toUpperCase()
}

/**
 * AES密文解密
 * @param msg 密文
 * @returns
 */
const useAESDecrypt = (msg: string) => {
  const skey = enc.Utf8.parse(AESKey)
  const hexStr = enc.Hex.parse(msg)
  const srcs = enc.Base64.stringify(hexStr)
  const optiops = {
    iv: enc.Utf8.parse(AESIV),
    mode: mode.CBC,
    padding: pad.Pkcs7
  }

  const decrypted = AES.decrypt(srcs, skey, optiops)
  const decryptedStr = decrypted.toString(enc.Utf8)
  return decryptedStr.toString()
}

/**
 * base64加密
 * @param msg 明文
 * @returns
 */
const useBase64Encrypt = (msg: string) => {
  return enc.Base64.stringify(enc.Utf8.parse(msg))
}

/**
 * base64解密
 * @param msg 密文
 * @returns
 */
const useBase64Decrypt = (msg: string) => {
  return enc.Base64.parse(msg).toString(enc.Utf8)
}

export { useAESEncrypt, useAESDecrypt, useBase64Encrypt, useBase64Decrypt }
