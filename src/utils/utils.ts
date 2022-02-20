import { numberMinAddZoreBefore } from './numberConvert'

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
 * @returns 单位毫秒:ms
 */
export function getCurrentTimeStamp() {
  return new Date().getTime()
}

/**
 * 时间戳 转 字符串拼接的时间
 * @param timeStamp 日期时间戳
 * @param dateChar 日期拼接字符，默认: "-"
 * @param timeChar 时间拼接字符,默认: ":"
 * @param appendChar 日期+时间之间分割字符,默认: " "
 * @returns
 */
export function formatTimeStamp(
  timeStamp: number,
  dateChar = '-',
  timeChar = ':',
  appendChar = ' '
) {
  if (!timeStamp) {
    return null
  }
  const date = new Date(timeStamp)

  const year = date.getFullYear() + dateChar
  const month = numberMinAddZoreBefore(date.getMonth() + 1) + dateChar
  const day = numberMinAddZoreBefore(date.getDate())

  const hour = numberMinAddZoreBefore(date.getHours()) + timeChar
  const minutes = numberMinAddZoreBefore(date.getMinutes()) + timeChar
  const second = numberMinAddZoreBefore(date.getSeconds())

  const dateString = year + month + day
  const timeString = hour + minutes + second

  return dateString + appendChar + timeString
}
