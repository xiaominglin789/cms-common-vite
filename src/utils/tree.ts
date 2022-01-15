/**
 * 树形数组 转 平级数组
 *  - 数据源item: id, pid, title
 *  - 结果item: id, pid, title
 * @param {*} treeArray
 * @param {*} list
 * @returns
 */
export function treeArrayToFlat(treeArray: any[], list = <any[]>[]) {
  for (let child of treeArray) {
    if (child.children) {
      // 构建新结构，存父级数据
      list.push({
        id: child.id,
        pid: child.pid,
        title: child.title
      })
      // 继续递归将children打平
      treeArrayToFlat(child.children, list)
    } else {
      // 满足条件.直接存
      list.push(child)
    }
  }
  return list
}

/**
 * 平级数组 转 树型数组
 *  - 数据源item: id, pid
 *  - 结果item: id, pid
 * @param {*} flatArray
 * @param {*} needChilrenEve 是否每一项加:children
 * @returns
 */
export function flatArrayToTree(flatArray: any[], needChilrenEve = false) {
  return flatArray.filter((child) => {
    if (needChilrenEve) {
      // 每一项加:children
      child.children = []
    }

    let newArray = flatArray.filter((item) => {
      if (item.id === child.pid) {
        // item是child的父项
        if (!item.children) {
          item.children = []
        }
        // 放到正确的位置
        item.children.push(child)
        return true
      }
    })
    return newArray.length === 0
  })
}
