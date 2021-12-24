import { Module } from 'vuex'
import { UserStateTypes, RootStateTypes } from '../interface/index'
import { userLogin } from '@/api/user'
import { UserLoginRequest } from '@/utils/interfaces/user'
import { useUserInfoCryptoEncode } from '@/hooks/useUserInfoCryptoEncode'

const userModule: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    token: '',
    isLogin: false
  },
  mutations: {},
  actions: {
    /** 登录 */
    loginHandle(context, userInfo: UserLoginRequest) {
      const { username, password } = userInfo
      const encodeHelper = useUserInfoCryptoEncode()

      const usernamed = encodeHelper.doUsenameEncode(username)
      const passworded = encodeHelper.doPasswordEncode(password)

      return userLogin({ username: usernamed, password: passworded })
    }
  }
}

export default userModule
