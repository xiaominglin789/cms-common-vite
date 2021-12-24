import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { RootStateTypes } from './interface/index'
import userModule from './modules/user'

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('xxx')

export const store = createStore<RootStateTypes>({
  modules: {
    userModule
  }
})

export function useStore() {
  return baseUseStore(key)
}
