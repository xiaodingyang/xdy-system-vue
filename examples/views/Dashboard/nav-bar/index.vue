<script>
import navMap from '@/router/navMap'
export default {
	data() {
		return {
			isCollapse: false,
		}
	},
	render(h) {
		return (
			<div class="menu">
				<div class="menu-header">
					{this.isCollapse ? '' : 'xdy-system'}
				</div>
				<el-menu
					default-active={this.$route.path}
					class="el-menu-vertical-demo"
					collapse={this.isCollapse}
					background-color='#000'
					text-color="#fff"
					active-text-color='#fff'
					router={true}
				>
					{this.loopList(navMap)}
				</el-menu>
			</div>
		)
	},
	computed: {
		
	},
	created() {
	},
	watch: {
		
	},
	methods: {
	
		menuIsOpen() {
			const isCollapse = this.isCollapse
			this.isCollapse = !isCollapse
		},
		isOpen() {
			return this.isCollapse
		},
		loopList(nav) {
			return nav.map((item) => {
				//   0为普通路由，1 为菜单栏路由
				if (item.meta && item.meta.type) {
                    const isSub = item.children&&item.children.some(item=>item.meta.type)
					if (isSub) {
						return (
							<el-submenu index="1">
								<template slot="title">
									<i class={item.meta.icon}></i>
									<span slot="title">{item.meta.title}</span>
								</template>
								{this.loopList(item.children)}
							</el-submenu>
						)
					} else {
						return (
							<el-menu-item index={item.path}>
								<i class={item.meta.icon}></i>
								<span slot="title">{item.meta.title}</span>
							</el-menu-item>
						)
					}
				} else if (item.children) {
					return this.loopList(item.children)
				}
			})
		},
	},
}
</script>

<style scoped lang="scss">
.menu {
	min-height: 100vh;
	display: flex;
    flex-direction: column;
    
	.menu-header {
		padding: 15px 0;
		text-align: center;
		background: $menuBgColor;
		color: #fff;
	}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 250px;
}
.el-menu-vertical-demo {
	//   min-height: 100vh;
}
/deep/.el-menu-item,
/deep/.el-submenu__title {
	height: 40px !important;
	line-height: 40px !important;
}

/deep/.el-menu {
	border-right: none;
    height: 100%;
}
</style>
