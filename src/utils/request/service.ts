import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElNotification, ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: String(import.meta.env.VITE_APP_BASE_URL) || '',
  timeout: Number(import.meta.env.VITE_APP_TIME_OUT) || 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求配置的处理
    // exp: 请求头携带token的操作
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 请求有相应
    // 2xx
    const status = response.status
    if (String(status).charAt(0) === '2') {
      return response.data
    }
    // 3xx 4xx 5xx
    // 状态码+错误码-统一处理: 弹窗...
    console.error(response)
    return Promise.reject(response)
  },
  (error: AxiosError) => {
    // 请求超时，网络异常
    if (error?.response) {
      // 弹窗通知处理
      ElNotification({
        title: '网络异常',
        message: '请检查您的网络状况...',
        type: 'error'
      })
      console.error('请求异常，status:', error?.response.status)
    }
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      // 通知处理或重新发生请求
      ElNotification({
        title: '超时请求',
        message: '网络状况拥堵,请求超时了',
        type: 'error'
      })
      console.error('请求超时')
    }

    // 消息提示
    ElMessage.error('网络出问题了...')
    return Promise.reject(error)
  }
)

/**
 * get
 * @param url 请求地址
 * @param params query参数对象: key-value
 * @param config 其他配置
 * @returns Promise
 */
function get<T>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  return service.get(url, { params, ...config })
}

/**
 * post
 * @param url 请求地址
 * @param data body参数, key-value
 * @param config 其他配置
 * @returns Promise
 */
function post<T>(
  url: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  return service.post(url, data, config)
}

/**
 * put
 * @param url 请求地址
 * @param data body参数对象, key-value
 * @param config 其他配置
 * @returns Promise
 */
function put<T>(
  url: string,
  data?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  return service.put(url, data, config)
}

/**
 * _delete 删除资源,无响应结果
 * 可使用post来设计资源删除,令请求有返回结果
 * @param url 请求地址
 * @param config 其他配置
 * @returns Promise
 */
function _delete(url: string, config?: AxiosRequestConfig): Promise<void> {
  return service.delete(url, config)
}

export { get, post, put, _delete }
export default service
