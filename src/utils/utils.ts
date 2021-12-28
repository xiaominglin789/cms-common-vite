/**
 * 检测资源是否为外部网络资源
 * @param path
 */
export function checkIsExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断对象是否为空
 * @param obj
 * @returns
 */
export function isEmptyObject(obj: any) {
  try {
    return JSON.stringify(obj) === '{}' ? false : true
  } catch (error) {
    return false
  }
}
