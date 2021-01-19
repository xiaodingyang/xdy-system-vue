<template>
	<div>
		<el-button @click="handelEdit">点击编辑</el-button>
		<x-edit
			ref="edit"
			:rule="rule"
			:props="props"
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
			props: {
                labelWidth: '100px',
            },
            editData:{
                username:'xiaodingyang',
                realname:'xdy',
            },
			/* 表单渲染项 */
			rule: [
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
        handelEdit(){
            this.$refs.edit.handleOpen(this.editData)
        },
		handleChange(data){
            console.log('handlechange',data);
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
