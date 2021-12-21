import svgIcon from '@/components/SvgIcon/index.vue'

/**
 * 注册到全局
 * @param app
 */
export function useSvgIcon (app: any) {
  app.component('SvgIcon', svgIcon)
}
