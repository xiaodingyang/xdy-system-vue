<template>
	<div class="nav-bar">
		<div class="left">
			<div class="nav-icon">
				<i
					class="el-icon-s-fold"
					style="font-size: 20px;color:#fff;cursor: pointer;"
					@click="menuIsOpen"
					v-if="!isOpen()"
				></i>
				<i
					v-else
					class="el-icon-s-unfold"
					style="font-size: 20px;color:#fff;cursor: pointer;"
					@click="menuIsOpen"
				></i>
			</div>
			<Breadcrumb class="bread"></Breadcrumb>
		</div>
		<div class="right"> <span @click="setLayout">布局设置</span></div>
		<el-dialog
			title="布局设置"
			:visible.sync="dialogVisible"
			width="30%"
            :show-close="false"
		>
			<RightBar></RightBar>
		</el-dialog>
	</div>
</template>

<script>
import Breadcrumb from '@/views/Dashboard/Breadcrumb'
import RightBar from '@/components/rightBar'
import { removeToken } from '@/utils/auth'
export default {
	props: {
		menuIsOpen: {
			type: Function,
			default: () => {},
		},
		isOpen: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
            dialogVisible:false
		}
	},
	methods: {
		loginout() {
			removeToken()
			this.$router.push('/login')
		},
		setLayout() {
            this.dialogVisible=true
        },
	},
	components: { Breadcrumb,RightBar },
	created() {
	},
	computed: {
		userInfo(){
            return this.$store.getters.userInfo
        }
	},
}
</script>

<style scoped lang="scss">
.nav-bar {
	display: flex;
	padding: 10px 14px;
	background: $menuBgColor;
    justify-content: space-between;
	.left {
		display: flex;
		i {
			line-height: 31px;
		}
		.bread {
			margin-top: 8px;
		}
	}
	.right {
		color:#fff;
        cursor:pointer;
	}
}
/deep/.el-dialog{
    position: absolute;
    right:0!important;
    margin:0!important;
}
</style>
