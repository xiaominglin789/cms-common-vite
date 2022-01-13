import { getUserInformation, userLogin } from '@/api/user'
import { useUserInfoCryptoEncode } from '@/hooks/useUserInfoCryptoEncode'
import router from '@/router'
import {
  UserInformationResponse,
  UserLoginRequest
} from '@/utils/interfaces/user'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { EnumStoreID } from './store-id-enum'
import TokenHelper from '@/utils/token'
import { LocalStorageHelper } from '@/utils/storage'
import { CONST_USER_INFO_KEY } from '@/constant/user'
import {
  CONST_ROUTER_LOGIN,
  CONST_ROUTER_LOGINED_FIRST
} from '@/constant/system'
import { AuthManualTokenExpireIn } from '@/utils/auth-token-manul'
import { useLocaleStore } from '@/store/locale'

/** user状态管理 */
export const useUserStore = defineStore(EnumStoreID.userStore, {
  state: () => {
    return {
      /** 当前登录的用户信息 */
      userInfo: <UserInformationResponse>{}
    }
  },
  getters: {
    hasUserInfo(): UserInformationResponse {
      return (
        (LocalStorageHelper.get(
          CONST_USER_INFO_KEY
        ) as UserInformationResponse) || this.userInfo
      )
    }
  },
  actions: {
    /** 更新用户信息,同步到缓存 */
    updateUserInfo(info: UserInformationResponse) {
      this.userInfo = info
      // 本地缓存
      LocalStorageHelper.set(CONST_USER_INFO_KEY, info)
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
        // console.log(result)
        // console.log(result.data)

        const { access_token, refresh_token } = result.data
        if (access_token) {
          // 触发token的保存,然后跳转到<首页|重要页面>
          TokenHelper.saveToken(access_token, refresh_token)

          // 记录用户登录时间
          AuthManualTokenExpireIn.isOpenManua &&
            AuthManualTokenExpireIn.saveCurrentLoginTime()

          const { msg } = useLocaleStore()
          ElMessage.success(msg('login.loginSuccess'))

          router.replace(CONST_ROUTER_LOGINED_FIRST)
        } else {
          console.error('data structure error: ', result)
        }
      } catch (error) {}
    },
    /** 获取用户信息 */
    async getUserInfo() {
      try {
        const result = await getUserInformation()
        result.data && this.updateUserInfo(result.data)
      } catch (error) {}
    },
    /**
     * 注销登录
     *  1.清空本地缓存、临时缓存
     *  2.清理权限相关配置
     *  最后强制跳转到登录页
     */
    async logout() {
      // localStorage
      LocalStorageHelper.clear()
      // clear permission-config

      const { msg } = useLocaleStore()
      ElMessage.warning(msg('login.logoutSuccess'))

      router.replace(CONST_ROUTER_LOGIN)
      window.location.reload()
    }
  }
})
