import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { RootStateTypes } from './interface/index'
import userModule from './modules/user'

export const key: InjectionKey<Store<RootStateTypes>> = Symbol()

export const store = createStore<RootStateTypes>({
  modules: {
    userModule
  }
})

/**
 * 一定要注意: vuex.useStore 或 由其拓展出来方法 务必在vue-setup生命周期内使用.
 * 否则会出现'store = undefined'的状况，程序抛出异常蹦掉!!!
 * ps:这个bug排了半天才在vuex官网找到蛛丝马迹
 * [vuex-composition](https://next.vuex.vuejs.org/guide/composition-api.html#composition-api)
 * @returns
 */
export function useStore() {
  return baseUseStore(key)
}
