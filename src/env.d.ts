/// <reference types="vite/client" />

interface ImportMeta {
  env: ImportMetaEnv
}

interface ImportMetaEnv {
  [key: string]: string | boolean | undefined
  BASE_URL: string
  MODE: string
  DEV: boolean
  PROD: boolean
  SSR: boolean
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
