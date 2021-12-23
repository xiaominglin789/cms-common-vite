import { Ref, ref } from 'vue'

interface PasswordShowOrHideResult {
  passwordType: Ref<string>
  onChangePwdType: () => void
}

/**
 * 密码输入栏状态控制
 * @returns
 */
export function usePasswordShowOrHide(): PasswordShowOrHideResult {
  const passwordType = ref('password')

  const onChangePwdType = () => {
    if (passwordType.value === 'password') {
      passwordType.value = 'text'
    } else {
      passwordType.value = 'password'
    }
  }

  return {
    passwordType,
    onChangePwdType
  }
}
