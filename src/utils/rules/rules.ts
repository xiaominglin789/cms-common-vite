import { useLocaleStore } from '@/store/locale'

/**
 * 自定义-密码提交的验证规则
 * @returns
 */
const validatePassword = () => {
  const { msg } = useLocaleStore()
  return (rule: any, value: string, callback: Function) => {
    // 自定义校验规则
    if (value.length < 6 || value.length > 11) {
      callback(new Error(msg('login.passwordRuleTip')))
    } else {
      callback()
    }
  }
}

export { validatePassword }
