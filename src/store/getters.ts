import { GetterTree } from 'vuex'
import { RootStateTypes } from './interface'
import { CacheLocal } from '@/utils/storage'
import { CONST_USER_INFO_KEY } from '@/constant'

/** getter暴露属性,简化部分过长语法糖 */
const getters: GetterTree<RootStateTypes, RootStateTypes> = {
  hasLogined: () => (CacheLocal.get(CONST_USER_INFO_KEY) ? true : false)
}

export default getters
