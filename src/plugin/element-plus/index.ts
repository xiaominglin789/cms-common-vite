import {
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElInput,
  ElButton,
  ElTable,
  ElTableColumn
} from 'element-plus'

const components = [ElInput, ElButton, ElTable, ElTableColumn]

const plugins = [ElLoading, ElMessage, ElMessageBox]

export function useElementPlus (app: any) {
  if (!app) {
    return
  }

  // 注册组件
  components.forEach((component) => {
    app.component(component.name, component)
  })
  // 注册插件
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
