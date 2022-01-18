/** 数字常用转化工具函数 */

/**
 * [0-,9]之间数字前加'0'拼接
 * @param num
 * @returns
 */
export function numberMinAddZoreBefore(num: number | string): number | string {
  if (num >= 0 && num < 10) {
    return '0' + num
  }
  return num
}

/**
 * 数字分割-每三位逗号
 *  - 基于 number.toLocaleString()
 * @param num
 * @returns
 */
export function numberToDivision(num: number): string {
  return num.toLocaleString()
}

/**
 * 小数 转 百分比
 * @param num 小数:[0-1]
 * @param locale 语言环境, 默认:'zh-cn' , 'zh-cn' | 'en'
 * @param style percent 百分比格式
 * @param signDisplay 默认自动, 'auto'(自动) | 'never'(不显示符号) | 'always'(显示符号)
 * @returns
 */
export function numberToPercent(
  num: number,
  locale: 'zh-cn' | 'en' = 'zh-cn',
  style: 'percent' = 'percent',
  signDisplay: 'auto' | 'never' | 'always' = 'auto'
): string {
  return num.toLocaleString(locale, { style, signDisplay })
}

/**
 * 数字 转 货币
 *  - 基于 number.toLocaleString()
 * @param num 数字
 * @param locale 语言环境, 默认:'zh-cn' , 'zh-cn' | 'en'
 * @param style currency 货币格式
 * @param currency 货币种类,默认'CNY', 'CNY'(人民币) | 'USD'(美元) | 'EUR'(欧元)
 * @param currencyDisplay 货币符号,默认'symbol', 'code'(ISO货币符) | 'name'(货币名) | 'symbol'(货币符号) | 'narrowSymbol'(简化的货币符号)
 * @returns
 */
export function numberToMonetization(
  num: number,
  locale: 'zh-cn' | 'en' = 'zh-cn',
  style: 'currency' = 'currency',
  currency: 'CNY' | 'USD' | 'EUR' = 'CNY',
  currencyDisplay: 'code' | 'name' | 'symbol' | 'narrowSymbol' = 'narrowSymbol'
): string {
  return num.toLocaleString(locale, {
    style,
    currency,
    currencyDisplay
  })
}
