import { Module } from 'vuex'
import { UserStateTypes, RootStateTypes } from '../interface/index'
import { userLogin } from '@/api/user'
import { UserLoginRequest } from '@/utils/interfaces/user'
import { useUserInfoCryptoEncode } from '@/hooks/useUserInfoCryptoEncode'
import { CacheLocal } from '@/utils/storage'
import { CONST_TOKEN_KEY } from '@/constant'
import router from '@/router'

const userModule: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    token: CacheLocal.get(CONST_TOKEN_KEY) || ''
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token
      // 本地缓存
      CacheLocal.set(CONST_TOKEN_KEY, token)
    }
  },
  actions: {
    /** 登录 */
    async loginHandle(context, userInfo: UserLoginRequest) {
      const { username, password } = userInfo
      const encodeHelper = useUserInfoCryptoEncode()

      const usernamed = encodeHelper.doUsenameEncode(username)
      const passworded = encodeHelper.doPasswordEncode(password)

      const result = await userLogin({
        username: usernamed,
        password: passworded
      })

      if (result?.token) {
        // 触发token的保存
        context.commit('SET_TOKEN', result.token)
        // 路由跳转,登录成功后跳转到<首页|重要页面>
        router.replace('/')
      }
    }
  }
}

export default userModule
