import { Module } from 'vuex'
import { UserStateTypes, RootStateTypes } from '../interface/index'
import { getUserInformation, userLogin } from '@/api/user'
import { UserLoginRequest } from '@/utils/interfaces/user'
import { useUserInfoCryptoEncode } from '@/hooks/useUserInfoCryptoEncode'
import { CacheLocal } from '@/utils/storage'
import {
  CONST_ROUTER_LOGINED_FIRST,
  CONST_TOKEN_KEY,
  CONST_REFRESH_TOKEN_KEY,
  CONST_USER_INFO_KEY
} from '@/constant'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { UserInformation } from '@/utils/interfaces/user'
import { USER_SET_TOKEN, USER_SET_USER_INFO } from '@/store/mutation-types'

const user: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: () => {
    return {
      token: CacheLocal.get(CONST_TOKEN_KEY) || '',
      userInfo: (CacheLocal.get(CONST_USER_INFO_KEY) as UserInformation) || {}
    }
  },
  getters: {
    token: (state) => state.token
  },
  mutations: {
    [USER_SET_TOKEN](state, token: string) {
      state.token = token
      // 本地缓存
      CacheLocal.set(CONST_TOKEN_KEY, token)
    },
    [USER_SET_USER_INFO](state, info: UserInformation) {
      state.userInfo = info
      // 本地缓存
      CacheLocal.set(CONST_USER_INFO_KEY, info)
    }
  },
  actions: {
    /** 登录 */
    async loginHandle({ commit }, userInfo: UserLoginRequest) {
      const { username, password } = userInfo
      const encodeHelper = useUserInfoCryptoEncode()

      const usernamed = encodeHelper.doUsenameEncode(username)
      const passworded = encodeHelper.doPasswordEncode(password)

      try {
        const result = await userLogin({
          username: usernamed,
          password: passworded
        })
        // console.log(result)
        // console.log(result.data)

        if (result.data.access_token) {
          // 触发token的保存,然后跳转到<首页|重要页面>
          commit(USER_SET_TOKEN, result.data.access_token)
          result.data.refresh_token &&
            CacheLocal.set(CONST_REFRESH_TOKEN_KEY, result.data.refresh_token)
          ElMessage.success('登录成功...')
          router.replace(CONST_ROUTER_LOGINED_FIRST)
        } else {
          console.error('数据结构有误: ', result)
        }
      } catch (error) {}
    },
    /** 获取用户信息 */
    async getUserInfo({ commit }) {
      try {
        const result = await getUserInformation()
        // 保存用户信息
        result.data && commit(USER_SET_USER_INFO, result.data)
        return result.data
      } catch (error) {}
    }
  }
}

export default user
