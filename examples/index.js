/*********************在examples文件夹中新建index.js用来整合所有的组件，形成组件库对外导出。*******************/

import xtable from '../packages/x-table/index.js'
import xedit from '../packages/x-edit/index.js'

// 存储组件列表
const components = [xtable,xedit]

const install = {
    // 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
	install: function(Vue) {
        // 判断是否安装
		 return components.map((component) => Vue.component(component.name, component)) // 遍历注册全局组件
	},
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
	install.install(window.Vue)
}
export const table = xtable // 按需引入
export const edit = xedit // 按需引入
export default install // 加载全部组件
