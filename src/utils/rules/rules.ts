/**
 * 自定义-密码提交的验证规则
 * @returns
 */
const validatePassword = () => {
  return (rule: any, value: string, callback: Function) => {
    // 自定义校验规则
    if (value.length < 6 || value.length > 11) {
      callback(new Error('密码必须在:6-11位之间'))
    } else {
      callback()
    }
  }
}

export { validatePassword }
