/** 前端自定义异常消息 */
const frontErrorMessage: Record<number, string> = {
  999: '服务器未知异常',
  401000: '登录失败',
  401001: '账号或密码错误',
  404000: '资源不存在',
  403002: '令牌已过期',
  403001: '令牌不合法,不能操作',
  403011: 'refressToken不合法',
  403012: 'refressToken已过期'
}

export default frontErrorMessage
