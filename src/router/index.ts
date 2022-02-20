import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { publicRoutes, privateRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
