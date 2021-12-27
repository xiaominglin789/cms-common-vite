import { Module } from 'vuex'
import { UserStateTypes, RootStateTypes } from '../interface/index'
import { userLogin } from '@/api/user'
import { UserLoginRequest } from '@/utils/interfaces/user'
import { useUserInfoCryptoEncode } from '@/hooks/useUserInfoCryptoEncode'
import { CacheLocal } from '@/utils/storage'
import {
  CONST_ROUTER_LOGINED_FIRST,
  CONST_TOKEN_KEY,
  CONST_REFRESH_TOKEN_KEY
} from '@/constant'
import router from '@/router'
import { ElMessage } from 'element-plus'

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

      try {
        const result = await userLogin({
          username: usernamed,
          password: passworded
        })
        console.log(result)

        if (result.data.access_token) {
          // 触发token的保存,然后跳转到<首页|重要页面>
          context.commit('SET_TOKEN', result.data.access_token)
          result.data.refresh_token &&
            CacheLocal.set(CONST_REFRESH_TOKEN_KEY, result.data.refresh_token)
          ElMessage.success('登录成功')
          router.replace(CONST_ROUTER_LOGINED_FIRST)
        }
      } catch (error) {}
    }
  }
}

export default userModule
