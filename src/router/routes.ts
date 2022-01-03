import { RouteRecordRaw } from 'vue-router'

/** 公开路由表 */
const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'personnel'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error/401.vue')
      }
    ]
  }
]

/** 私有路由表 */
const privateRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: () => import('@/layout/index.vue'),
    redirect: '/user/manage',
    meta: {
      title: '用户',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        name: 'userManage',
        component: () => import('@/views/user-manage/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'personnel'
        }
      },
      {
        path: '/user/role',
        name: 'userRole',
        component: () => import('@/views/role-list/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        name: 'userPermission',
        component: () => import('@/views/permission-list/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index.vue'),
        meta: {
          title: '用户信息'
        }
      },
      {
        path: '/user/import',
        name: 'userImport',
        component: () => import('@/views/import/index.vue'),
        meta: {
          title: '导入用户组'
        }
      }
    ]
  },
  {
    path: '/article',
    component: () => import('@/layout/index.vue'),
    redirect: '/article/ranking',
    meta: {
      title: '临时menu文章',
      icon: 'introduce'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index.vue'),
        name: 'articleRanking',
        meta: {
          title: '文章排行',
          icon: 'tree'
        }
      },
      {
        path: '/article/edit/:id',
        component: () => import('@/views/article-edit/index.vue'),
        name: 'articleEdit',
        meta: {
          title: '修改文章'
        }
      },
      {
        path: '/article/detail/:id',
        component: () => import('@/views/article-detail/index.vue'),
        name: 'articleDetail',
        meta: {
          title: '文章详情'
        }
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index.vue'),
        name: 'articleCreate',
        meta: {
          title: '新建文章',
          icon: 'introduce'
        }
      }
    ]
  }
]

export { publicRoutes, privateRoutes }
