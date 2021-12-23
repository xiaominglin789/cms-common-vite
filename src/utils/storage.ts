/** CacheLocal 本地缓存 */
class CacheLocal {
  static set(key: string, value: any) {
    if (!key || !value || JSON.stringify(value) === '{}') {
      return
    }

    let valueStr = value
    if (typeof value === 'object') {
      valueStr = JSON.stringify(value)
    }

    localStorage.setItem(key, valueStr)
  }

  static get(key: string) {
    if (!key) return

    let result = window.localStorage.getItem(key) || ''
    try {
      return JSON.parse(result)
    } catch (error) {
      return result
    }
  }

  static remove(key: string) {
    if (!key) return

    window.localStorage.removeItem(key)
  }

  /** 清空所有本地缓存 */
  static clear() {
    window.localStorage.clear()
  }
}

/** CacheSession 临时缓存 */
class CacheSession {
  static set(key: string, value: any) {
    if (!key || !value || JSON.stringify(value) === '{}') {
      return
    }

    let valueStr = value
    if (typeof value === 'object') {
      valueStr = JSON.stringify(value)
    }
    window.sessionStorage.setItem(key, valueStr)
  }

  static get(key: string) {
    if (!key) return

    const value = window.sessionStorage.getItem(key) || ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  static remove(key: string) {
    if (!key) return

    window.sessionStorage.removeItem(key)
  }

  /** 清空所有session临时缓存 */
  static clear() {
    window.sessionStorage.clear()
  }
}

export { CacheLocal, CacheSession }
