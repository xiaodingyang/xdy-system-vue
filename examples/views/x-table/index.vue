<template>
	<x-table
		ref="table"
		:columns="columns"
		:search="search"
		:operation="operation"
		:dataFunc="dataFunc"
        :props="props"
	></x-table>
</template>

<script>
export default {
	props: [],
	data() {
		return {
            props:{
                headerStyle:{background: '#e5e5e5', color: '#666'}, // 表格头部颜色设置
                rowKey: 'id', // 行key，用来多选使用
                style:{}, // 表格样式
                // 树形表格
                treeProps:{
						children: 'children',
						hasChildren: 'hasChildren',
					}
            },
			dataFunc() {
				return new Promise((resolve, reject) => {
					resolve({
						list: [
							{ username: 'xdy', realname: '肖定阳' },
							{ username: 'xdy', realname: '肖定阳' },
							{ username: 'xdy', realname: '肖定阳' },
							{ username: 'xdy', realname: '肖定阳' },
						],
						total: 4,
						pageSize: 10,
						currentPage: 1,
					})
				})
			},
			editData: {},
			form: {},
			file: {},
			editProps: {
				labelWidth: '100px',
			},
			/* 表格渲染项 */
			columns: [
				{ key: 'username', label: '用户名',width:'200px' },
				{ key: 'realname', label: '昵称' },
			],
			/* 操作项 */
			operation: {
				width: '200px',
				button: [
					{ label: '编辑', func: this.handelEdit },
					{
						label: '删除',
						type: 'danger',
					},
				],
			},
			/* 搜索项 */
			search: {
				form: [
					{
						type: 'input',
						field: 'realname',
						props: {
							placeholder: '昵称',
						},
					},
					{
						type: 'input',
						field: 'username',
						props: {
							placeholder: '用户名',
						},
					},
				],
				button: [{ label: '新增用户', func: this.handleAdd }],
			},
			/* 表单渲染项 */
			formColumn: [
				{
					type: 'input',
					field: 'username',
					title: '用户名',
					props: {
						placeholder: '请输入用户名',
						clearable: true,
					},
					validate: [
						{
							required: true,
							message: '请输入用户名',
							trigger: 'blur',
						},
					],
				},
				{
					type: 'input',
					field: 'realname',
					title: '昵称',
					props: {
						placeholder: '请输入昵称',
						clearable: true,
					},
					validate: [
						{
							required: true,
							message: '请输入昵称',
							trigger: 'blur',
						},
					],
				},
			],
		}
	},
	computed: {},
	methods: {
		// 编辑
		handelEdit(row) {},
		// 刷新列表
		refreshTable(params) {
			return this.$refs.table.getData(params)
		},
		handleAdd() {},
	},
	created() {},
}
</script>
