import { Module } from 'vuex'
import { UserStateTypes, RootStateTypes } from '../interface/index'
import { userLogin } from '@/api/user'
import { UserLoginRequest } from '@/utils/interfaces/user'
import { useAESEncrypt, useBase64Encrypt } from '@/utils/crypto'

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
      const usernamed = useAESEncrypt(username)
      const passworded = useAESEncrypt(useBase64Encrypt(password))
      return userLogin({ username: usernamed, password: passworded })
    }
  }
}

export default userModule
