/**
 * 响应格式统一
 * code: 返回的状态码: 0 代表响应成功, >0 则代表对应业务的错误状态码；
 * success: true(响应成功), false(响应业务异常)；
 * data: T 或 空string
 * message: ok(响应成功) 或 异常信息
 * request: "请求方法 请求路径"
 */
export interface ResponseType<T> {
  code: number
  data: T | ''
  success: boolean
  message: string
  request: string
}
