import router from './router'
import { CONST_ROUTER_LOGIN, CONST_ROUTER_LOGINED_FIRST } from '@/constant'
import { useStore } from '@/store'

/** 路由白名单列表 */
const writeRouteList = [CONST_ROUTER_LOGIN]
const store = useStore()

/**
 * 导航守卫: 鉴权
 *
 * beforeEach参数说明:
 *   to: 即将要进去的目标路由
 *   from: 即将离开的路由
 *   next: 是否要去?
 */
router.beforeEach((to, from, next) => {
  // 控制步骤:
  //  1.用户已登录，不允许进入登录页
  //  2.用户未登录,只允许进入<白名单路由页面>

  if (store.state.userState.token) {
    // 已登录
    if (to.path === CONST_ROUTER_LOGIN) {
      next(CONST_ROUTER_LOGINED_FIRST)
    } else {
      next()
    }
  } else {
    // 未登录
    if (writeRouteList.includes(to.path)) {
      // 白名单内可以进入
      next()
    } else {
      // 想去非白名单页面, 只能待在登录页
      next(CONST_ROUTER_LOGIN)
    }
  }
})
