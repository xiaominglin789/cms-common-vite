/**
 * 检测资源是否为外部网络资源
 * @param path
 */
export function checkIsExternal (path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
