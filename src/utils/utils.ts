/**
 * 检测资源是否为外部网络资源
 * @param path
 */
export function checkIsWebURL(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/** 判断数组是否为空 */
export function isEmptyArray(array: Array<any>) {
  const currentTypeStr = Object.prototype.toString.call(array)
  if (currentTypeStr !== '[object Array]') {
    throw new Error('that is not Array, that is ' + currentTypeStr)
  }

  return JSON.stringify(array) === '[]'
}

/**
 * 获取当前时间戳
 * @returns
 */
export function getCurrentTimeStamp() {
  return new Date().getTime()
}
