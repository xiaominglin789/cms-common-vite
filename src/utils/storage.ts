/** LocalStorageHelper 本地缓存 */
class LocalStorageHelper {
  /**
   * 设置缓存
   * @param key
   * @param value
   * @returns
   */
  static set(key: string, value: any) {
    if (!key) return

    let valueStr = value
    // 复杂数据类型-将JSON.stringify转成字符串
    if (typeof value === 'object') {
      valueStr = JSON.stringify(value)
    }

    window.localStorage.setItem(key, valueStr)
  }

  /**
   * 获取缓存
   * @param key
   * @returns
   */
  static get(key: string) {
    if (!key) return

    let result = window.localStorage.getItem(key)
    try {
      if (result == null) {
        return result
      }
      return JSON.parse(result)
    } catch (error) {
      return result
    }
  }

  /**
   * 移除某个缓存
   * @param key
   * @returns
   */
  static remove(key: string) {
    if (!key) return

    window.localStorage.removeItem(key)
  }

  /** 清空所有本地缓存 */
  static clear() {
    window.localStorage.clear()
  }
}

/** SessionStorageHelper 临时缓存 */
class SessionStorageHelper {
  /**
   * 设置缓存
   * @param key
   * @param value
   * @returns
   */
  static set(key: string, value: any) {
    if (!key) return

    let valueStr = value
    if (typeof value === 'object') {
      valueStr = JSON.stringify(value)
    }
    window.sessionStorage.setItem(key, valueStr)
  }

  /**
   * 获取缓存
   * @param key
   * @returns
   */
  static get(key: string) {
    if (!key) return

    const value = window.sessionStorage.getItem(key) || ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  /**
   * 移除某个缓存
   * @param key
   * @returns
   */
  static remove(key: string) {
    if (!key) return

    window.sessionStorage.removeItem(key)
  }

  /** 清空所有session临时缓存 */
  static clear() {
    window.sessionStorage.clear()
  }
}

export { LocalStorageHelper, SessionStorageHelper }
