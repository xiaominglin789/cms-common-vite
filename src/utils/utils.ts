/**
 * 检测资源是否为外部网络资源
 * @param path
 */
export function checkIsWebURL(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 获取当前时间戳
 * @returns
 */
export function getCurrentTimeStamp() {
  return new Date().getTime()
}
