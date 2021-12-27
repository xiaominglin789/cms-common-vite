import axios, { AxiosError, AxiosPromise, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { CacheLocal } from '@/utils/storage'
import { CONST_TOKEN_KEY } from '@/constant'
import { ResponseType } from '@/utils/interfaces/response'

const service = axios.create({
  baseURL: String(import.meta.env.VITE_APP_BASE_URL) || '',
  timeout: Number(import.meta.env.VITE_APP_TIME_OUT) || 5000, // 请求超时时间设置
  validateStatus(status: number) {
    return status >= 200 && status < 510
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // 请求配置的处理
    // exp: 请求头携带token的操作
    if (CacheLocal.get(CONST_TOKEN_KEY)) {
      // 与后端约定令牌传输: Authorization bearer
      config.headers.Authorization = `Bearer ${CacheLocal.get(CONST_TOKEN_KEY)}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseType<any>, any>) => {
    // 2xx
    const status = response.status
    if (String(status).charAt(0) === '2') {
      return response.data.data
    }

    const { code, message } = response.data
    return new Promise((resolve, rejects) => {
      // 业务异常处理 4xx 5xx 状态码+错误码-统一处理: 弹窗...
      console.log('code = ', code, ' message = ', message)

      if (code && message) {
        ElMessage.error(message)
      }

      rejects(response)
    })
  },
  (error: AxiosError) => {
    if (!error.response) {
      ElMessage.error('请检查 API 是否异常')
      console.error('请检查 API 是否异常')
    }

    // 判断请求超时
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      ElMessage.error('请求超时')
      console.error('请求超时')
    }

    return Promise.reject(error)
  }
)

/**
 * get
 * @param url 请求地址
 * @param params query参数对象: key-value
 * @returns Promise
 */
function get<T>(url: string, params?: Record<string, any>): AxiosPromise<T> {
  return service({
    method: 'GET',
    url,
    params
  })
}

/**
 * post
 * @param url 请求地址
 * @param data body参数, key-value
 * @returns Promise
 */
function post<T>(url: string, data?: Record<string, any>): AxiosPromise<T> {
  return service({
    method: 'POST',
    url,
    data
  })
}

/**
 * put
 * @param url 请求地址
 * @param data body参数对象, key-value
 * @returns Promise
 */
function put<T>(url: string, data?: Record<string, any>): AxiosPromise<T> {
  return service({
    method: 'PUT',
    url,
    data
  })
}

/**
 * _delete 删除资源,无响应结果
 * 可使用post来设计资源删除,令请求有返回结果
 * @param url 请求地址
 * @returns Promise
 */
function _delete(url: string) {
  return service({
    method: 'DELETE',
    url
  })
}

export { get, post, put, _delete }
export default service
