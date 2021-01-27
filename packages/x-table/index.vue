<template>
	<div class="base-page">
		<div class="search" v-show="search.form">
			<form-create
				:option="option"
				v-model="form"
				:rule="search.form"
			></form-create>
			<el-button
				icon="el-icon-search"
				type="main"
				@click="onSearch"
				size="mini"
				>搜索</el-button
			>
			<el-button @click="reset" size="mini" icon="el-icon-setting"
				>重置</el-button
			>
		</div>

		<div class="table">
			<div class="button" v-show="search.button">
				<el-form>
					<el-form-item>
						<el-button
							:type="item.type || 'main'"
							@click="item.func"
							:icon="setIcon(item)"
							size="mini"
							v-for="item in search.button"
							:key="item.label"
							>{{ item.label }}</el-button
						>
					</el-form-item>
				</el-form>
			</div>
			<Table
				v-loading="loading"
				element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading"
				element-loading-background="rgba(0, 0, 0, 0.8)"
				:data="tableData"
				:columns="columns"
				:operation="operation"
				:multiple="multiple"
				@selectChange="selectChange"
				:refreshTable="getData"
				:props="props"
			></Table>
			<div class="pagination" v-show="isPagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="[10, 20, 30]"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.total"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
/*
@ tableData 表格数据
@ columns 表格字段与对应中文
@ operation 表格操作栏
@ search 表格搜索栏，form表示搜索框，button表示按钮
*/
import Table from './table'
export default {
	name: 'x-table',
	components: { Table },
	props: {
		//   表格列
		columns: {
			type: Array,
			default: () => [],
		},
		// 操作项
		operation: {
			type: Object,
			default: () => {},
		},
		// 搜索项
		search: {
			type: Object,
			default: () => {
				return {
					button: [],
					form: [],
				}
			},
		},
		// 通过调用方法获取tableData，可以实现分页
		dataFunc: {
			type: Function,
			default: () => function() {},
		},
		// 是否多选，默认不多选
		multiple: {
			type: Boolean,
			default: false,
		},
		// 是否需要分页，默认需要
		isPagination: {
			type: Boolean,
			default: true,
		},
		// 关于表格的配置
		props: {
			type: Object,
		},
	},
	data() {
		return {
			tableData: [],
			form: {},
			currentPage: 10,
			pagination: {},
			curPage: 1,
			pageSize: 10,
			loading: true,
			option: {
				form: {
					//行内表单模式
					inline: true,
					size: 'mini',
				},
				submitBtn: {
					show: false,
				},
			},
		}
	},
	created() {
		this.getData({
			pageSize: this.pageSize,
			curPage: this.curPage,
		})
	},
	methods: {
        reset(){
            this.form.resetFields()
        },
		//   勾选改变
		selectChange(val) {
			this.$emit('selectChange', val)
		},
		// 搜索
		onSearch() {
			this.form.submit((data) => {
				this.getData({
					...data,
					pageSize: this.pageSize,
					curPage: this.curPage,
				})
			})
		},
		// 每页条数改变
		handleSizeChange(val) {
			this.pageSize = val
			this.getData({
				...this.form,
				pageSize: this.pageSize,
				curPage: this.curPage,
			})
		},
		// 页码改变
		handleCurrentChange(val) {
			this.curPage = val
			this.getData({
				...this.form,
				pageSize: this.pageSize,
				curPage: this.curPage,
			})
		},
		// 获取数据
		getData(params) {
			this.loading = true
			this.dataFunc(params)
				.then((res) => {
					if (res.list) {
						this.tableData = res.list
						this.pagination = {
							total: res.total, // 总数
							pageSize: res.pageSize, // 一页多少条
							currentPage: res.curPage, // 当前第多少页
						}
					}
					this.loading = false
				})
				.catch(() => (this.loading = false))
		},
		// 设置按钮图标
		setIcon(item) {
			let icon
			if (item.label.includes('新增')) {
				icon = 'el-icon-plus'
			} else {
				icon = 'el-icon-s-operation'
			}
			return icon
		},
	},
}
</script>

<style lang="scss" scoped>
.search {
	display: flex;
	border-radius: 5px;
	background: #fff;
	padding-bottom: 10px;
}
.el-form-item /deep/ {
	margin-bottom: 0;
}
.pagination {
	text-align: right;
	background: #fff;
	padding: 10px;
}
.table {
	background: #fff;
	border-radius: 5px;
}
/deep/ .el-table {
	height: 580px;
}
/deep/ .el-table__empty-text {
	line-height: 580px;
}
/deep/.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
	margin-bottom: 0;
}
</style>
