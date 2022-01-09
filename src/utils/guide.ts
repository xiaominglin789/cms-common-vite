import type { Step } from 'driver.js'

/** 页面功能引导步骤 */
export const guideSteps = (i18n: { t: (arg0: string) => any }) => {
  const steps: Step[] = [
    {
      element: '.app-guide',
      popover: {
        title: i18n.t('guide.title'),
        description: i18n.t('guide.guideStart'),
        position: 'bottom-right'
      }
    },
    /** 菜单 */
    {
      element: '.side-bar',
      popover: {
        title: i18n.t('guide.menuTitle'),
        description: i18n.t('guide.menuDes'),
        position: 'right'
      }
    },
    /** 菜单检索 */
    {
      element: '.header-search',
      popover: {
        title: i18n.t('guide.menuSearchTitle'),
        description: i18n.t('guide.menuSearchDes'),
        position: 'left'
      }
    },
    /** 换肤 */
    {
      element: '.dynamic-theme',
      popover: {
        title: i18n.t('guide.themeTitle'),
        description: i18n.t('guide.themeDes'),
        position: 'left'
      }
    },
    /** 语言切换 */
    {
      element: '.app-language',
      popover: {
        title: i18n.t('guide.themeTitle'),
        description: i18n.t('guide.themeDes'),
        position: 'left'
      }
    },
    /** 最大化 */
    {
      element: '.screen-full',
      popover: {
        title: i18n.t('guide.screenfullTitle'),
        description: i18n.t('guide.screenfullDes'),
        position: 'left'
      }
    }
  ]
  return steps
}
