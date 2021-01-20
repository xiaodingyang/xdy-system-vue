import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import myPlugins from './plugins'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vhCheck from 'vh-check'
import formCreate from '@form-create/element-ui'
import xdySystem,{table} from "./index";

// 进度条
vhCheck('browser-address-bar')

Vue.use(ElementUI)

Vue.use(myPlugins)
console.log('aaa',xdySystem,table);
Vue.use(xdySystem)
// Vue.use(table)

// form-create
Vue.use(formCreate) // 全局挂载，vue组件中可以使用 this.$formCreate 获取

new Vue({
	router,
    store,
	render: (h) => h(App),
}).$mount('#app')
