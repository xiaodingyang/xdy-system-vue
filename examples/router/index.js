import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './navMap'
import NProgress from 'nprogress'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
	base: process.env.BASE_URL,
	routes,
})
router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
router.afterEach(() => {
	NProgress.done()
})
// 解决ElementUI导航栏中重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}
export default  router
