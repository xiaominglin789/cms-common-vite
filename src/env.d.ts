/// <reference types="vite/client" />

// 可能之前npm安装的vue3问题导致 import.meta.env.xxx不能识别
// 现在用pnpm安装它又可以识别了，这里的 ImportMeta.env 声明可以去掉了
// interface ImportMeta {
//   env: ImportMetaEnv
// }

// interface ImportMetaEnv {
//   [key: string]: string | boolean | undefined
//   BASE_URL: string
//   MODE: string
//   DEV: boolean
//   PROD: boolean
//   SSR: boolean
// }

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
