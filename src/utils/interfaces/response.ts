export interface ResponseType<T> {
  success?: boolean
  error_code?: number
  data?: T | null
  message?: string
}
