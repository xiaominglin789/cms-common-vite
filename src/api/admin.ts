import { UserListResponse } from '@/utils/interfaces/admin'
import { get } from '@/utils/request/service'

/**
 * 获取员列表
 * @param page 页数
 * @param size 每页条数
 * @returns
 */
export const getUserList = (page: number, size: number = 1) => {
  return get<UserListResponse>(`/cms/admin/users?page=${page}&size=${size}`)
}
