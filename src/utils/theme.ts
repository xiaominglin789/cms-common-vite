import rgbHex from 'rgb-hex'
import colorFunc from 'css-color-function'
import elementResult from 'element-plus/dist/index.css'
/**
 * 该文件:主要动态替换element-plus的主题色
 */

/**
 * element主题色替换表
 * color(primary shade(10%))
 *   primary 主色替换占位
 *   shade(x) 主色加黑,x:0-9
 *   tint(x) 主色加白,x:0-9
 */
const fornums = {
  'shade-1': 'color(primary shade(10%))',
  'light-1': 'color(primary tint(10%))',
  'light-2': 'color(primary tint(20%))',
  'light-3': 'color(primary tint(30%))',
  'light-4': 'color(primary tint(40%))',
  'light-5': 'color(primary tint(50%))',
  'light-6': 'color(primary tint(60%))',
  'light-7': 'color(primary tint(70%))',
  'light-8': 'color(primary tint(80%))',
  'light-9': 'color(primary tint(90%))'
}

// elemtn-plus 默认默认主题色值
const elColorMap = {
  '#3a8ee6': 'shade-1',
  '#409eff': 'primary',
  '#53a8ff': 'light-1',
  '#66b1ff': 'light-2',
  '#79bbff': 'light-3',
  '#8cc5ff': 'light-4',
  '#a0cfff': 'light-5',
  '#b3d8ff': 'light-6',
  '#c6e2ff': 'light-7',
  '#d9ecff': 'light-8',
  '#ecf5ff': 'light-9'
}

/**
 * element主题色值打标记
 * @param styleText
 */
const styleReplaceTag = (styleText: string) => {
  for (const [k, v] of Object.entries(elColorMap)) {
    styleText = styleText.replace(new RegExp(k, 'ig'), v)
  }
  return styleText
}

/**
 * 根据传入的主色生成新的样式表
 * @param mainColor 主色
 * @returns
 */
export const generalStyle = async (mainColor: string) => {
  // 1.根据传入的主色生成色值表
  // 2.获取当前element的默认样式表,把需要替换的色值打上标记
  // 3.遍历生成的色值表,对样式的标记字符-进行全局替换
  // 4.返回得到最新的样式表
  const colors = generalColors(mainColor)

  const elementStyle = elementResult
  let cssText = styleReplaceTag(elementStyle)

  // exp: --color-el-primary: [primay] -> colors['primary] = #xxxx
  Object.keys(colors).forEach((key) => {
    cssText = cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return cssText
}

/**
 * 在html-head插入新的样式表
 * @param newStyle
 */
export const writeNewStyle = (newStyle: string) => {
  if (!newStyle) return

  const _style = document.createElement('style')
  _style.innerText = newStyle
  document.head.appendChild(_style)
}

/**
 * 根据主色生成色值表
 * @param mainColor
 */
export const generalColors = (mainColor: string) => {
  if (!mainColor) return

  const colors: any = {
    primary: mainColor
  }

  for (const [k, v] of Object.entries(fornums)) {
    const val = v.replace(/primary/g, mainColor)
    colors[k] = '#' + rgbHex(colorFunc.convert(val))
  }

  return colors
}
