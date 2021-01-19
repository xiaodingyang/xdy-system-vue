<template>
	<div id="app">
		<el-scrollbar style="height:100%;height:100%;">
			<router-view></router-view>
		</el-scrollbar>
	</div>
</template>

<script>
import Dashboard from '@/views/Dashboard'
import { sourceCopy } from '@/utils'
import { getToken } from '@/utils/auth'
import store from '@/store'
export default {
	name: 'App',
	components: { Dashboard },
	data() {
		return {
			viewList: [],
		}
	},
	methods: {
		setView(routes, arr) {
			routes.forEach((item) => {
				if (item.children) {
					this.setView(item.children, arr)
				}
				arr.forEach((_item) => {
					if (_item === item.path) {
						this.viewList.push(item)
					}
				})
			})
		},
	},
	mounted() {
		/**************在页面加载时读取localStorage里的状态信息***************/
		const theme = JSON.parse(localStorage.getItem('theme'))
		const visitedViews = JSON.parse(localStorage.getItem('visitedViews'))
		// 拿到上次离开时的路由
        const prePath = localStorage.getItem('prePath')
		if (prePath&&getToken()) {
			this.$router.push(prePath)
		}
		// 设置主题
		if (theme) {
			this.$store.dispatch('setTheme', theme)
			localStorage.removeItem('theme')
		} else {
			this.$store.dispatch('setTheme', 'theme1')
		}
		// 设置tagView
		if (visitedViews) {
			store.subscribe((mutation, state) => {
				if (mutation.type === 'SET_MENU_LIST') {
					const sidebarRouters = mutation.payload.sidebarRouters
					this.setView(sidebarRouters, visitedViews)
					this.viewList.forEach((item) => {
						this.$store.dispatch('tagsView/addVisitedView', item)
						localStorage.removeItem('visitedViews')
					})
				}
			})
		}

		/******************在页面刷新时将vuex里的信息保存到localStorage里***************/
		window.addEventListener('beforeunload', (e) => {
			// ;(e || window.event).returnValue = '页面正在进行操作,确定离开此页吗？'

			// 关闭，刷新浏览器的时候，将主题和tagView存到本地
			const theme = JSON.stringify(this.$store.getters.theme)
			const visitedViews = this.$store.getters.visitedViews.map(
				(item) => item.path
			)
			if (theme) {
				localStorage.setItem('theme', theme)
			}

			if (visitedViews) {
				localStorage.setItem(
					'visitedViews',
					JSON.stringify(visitedViews)
				)
            }
            const path = window.location.pathname
            if(path!=='/login') localStorage.setItem('prePath', path)
		})
	},
}
</script>

<style lang="scss">
#app {
	height: 100vh;
	width: 100vw;
	.el-scrollbar__wrap {
		overflow-x: hidden; /*去除x轴滚动条*/
		white-space: nowrap; /*字体不换行，出现横向滚动条*/
	}
}
</style>
<style lang="scss"></style>
