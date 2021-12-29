import { getUserInformation, userLogin } from '@/api/user'
import {
  CONST_REFRESH_TOKEN_KEY,
  CONST_ROUTER_LOGINED_FIRST,
  CONST_TOKEN_KEY,
  CONST_USER_INFO_KEY
} from '@/constant'
import { useUserInfoCryptoEncode } from '@/hooks/useUserInfoCryptoEncode'
import router from '@/router'
import { UserInformation, UserLoginRequest } from '@/utils/interfaces/user'
import { CacheLocal } from '@/utils/storage'
import { defineStore } from 'pinia'
import { EnumStoreID } from './store-id-enum'

/** user状态管理 */
export const useUserStore = defineStore(EnumStoreID.userStore, {
  state: () => {
    return {
      /** 令牌 */
      token: CacheLocal.get(CONST_TOKEN_KEY) || '',
      /** 当前登录的用户信息 */
      userInfo: <UserInformation>{}
    }
  },
  getters: {
    hasToken(): boolean {
      return this.token === ''
    }
  },
  actions: {
    /** 更新access_token状态,同步到缓存 */
    updateToken(access_token: string): void {
      console.log('loginHandle -> updateToken')
      if (!access_token) return
      this.token = access_token
      // 本地缓存
      CacheLocal.set(CONST_TOKEN_KEY, access_token)
    },
    /** 更新用户信息,同步到缓存 */
    updateUserInfo(info: UserInformation) {
      this.userInfo = info
      // 本地缓存
      CacheLocal.set(CONST_USER_INFO_KEY, info)
    },
    /** 登录 */
    async login(userInfo: UserLoginRequest) {
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
        console.log(result.data)

        if (result.data.access_token) {
          // 触发token的保存,然后跳转到<首页|重要页面>
          this.updateToken(result.data.access_token)
          // 缓存refresh_token
          result.data.refresh_token &&
            CacheLocal.set(CONST_REFRESH_TOKEN_KEY, result.data.refresh_token)

          router.replace(CONST_ROUTER_LOGINED_FIRST)
        } else {
          console.error('数据结构有误: ', result)
        }
      } catch (error) {}
    },
    /** 获取用户信息 */
    async getUserInfo() {
      try {
        const result = await getUserInformation()
        result.data && this.updateUserInfo(result.data)
      } catch (error) {}
    }
  }
})
