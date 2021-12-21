import { Ref, ref } from 'vue'

interface PasswordShowOrHideResult {
  passwordType: Ref<string>
  onChangePwdType: () => void
}

export function usePasswordShowOrHide (): PasswordShowOrHideResult {
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
