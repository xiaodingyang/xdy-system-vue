<template>
	<div>
		<el-button @click="handelEdit">点击编辑</el-button>
		<el-button @click="handelAdd">点击新增</el-button>
		<x-edit
			ref="edit"
			:rule="rule"
			:props="editProps"
			:submitFunc="submitFunc"
			@change="handleChange"
			@beforeSubmit="beforeSubmit"
			@afterSubmit="afterSubmit"
		></x-edit>
	</div>
</template>

<script>
export default {
	props: [],
	data() {
		return {
            submitFunc(){
                return new Promise((resolve,reject)=>{
                setTimeout(() => {
                    resolve({
                        message:'ok',
                        status:true
                    })
                }, 1000);
                })
            },
            form:{},
			editProps: {
                labelWidth: '100px',
            },
            editData:{
                username:'xiaodingyang',
                realname:'xdy',
                component:'/aaa/bbb'
            },
			/* 表单渲染项 */
			rule: [
                {
					type: 'radio',
					title: '菜单类型',
					field: 'type',
					options: [
						{ label: '按钮路由', value: 0 },
						{ label: '菜单目录', value: 1 },
					],
					validate: [
						{
							type: 'string',
							required: true,
							message: '请选择菜单类型',
						},
					],
				},
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
                {
					type: 'input',
					title: '组件路径',
					field: 'component',
					validate: [
						{
							type: 'string',
							required: true,
							message: '请输入组件地址',
						},
					],
					props: {
						placeholder: '请输入组件地址',
					},
				},
			],
		}
	},
	computed: {},
	methods: {
        handelEdit(){
            this.$refs.edit.handleOpen(this.editData)
            this.$set(this.editProps, 'diaTitle', '编辑')
        },
        handelAdd(){
            this.$refs.edit.handleOpen()
            this.$set(this.editProps, 'diaTitle', '新增')
        },
		handleChange($f) {
            // 菜单类型改变
			if ($f.form.type === 0) {
				$f.hidden(true, ['realname'])
			}else{
				$f.hidden(false, ['realname'])
			}
		},
        beforeSubmit(data){
            console.log('beforeSubmit',data);
            data.age = 18
        },
        afterSubmit(data){
            console.log('afterSubmit',data);
        },
        
	},
	created() {},
}
</script>
