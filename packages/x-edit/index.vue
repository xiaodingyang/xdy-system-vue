<template>
	<el-dialog
		:title="deProps.diaTitle"
		:visible.sync="dialogFormVisible"
		:close-on-click-modal="false"
		:width="deProps.diaWidth"
	>
		<form-create
			:option="option"
			v-model="form"
			:rule="rule"
			@on-submit="handleSubmit"
			@change="handleChange"
		></form-create>
	</el-dialog>
</template>

<script>
export default {
	name: 'x-edit',
	props: {
		// 表单渲染项
		rule: {
			type: Array,
			default: [],
		},
		// 提交api函数
		submitFunc: {
			type: Function,
			require: true,
		},
		// dialog配置项，以及表单配置项
		props: {
            type: Object,
            default:()=>{}
		},
	},
	components: {},
	data() {
		return {
			dialogFormVisible: false,
			form: {},
			editId: '',
            deProps:null,
            option:{},
		}
	},
	created() {
        this.initProps()
	},
	methods: {
        initProps(){
            const props = {
            diaWidth: '50%', // dialog 宽度
				diaTitle: '编辑', // 弹窗标题
				labelWidth: '150px', // 表单label宽度
				labelPosition: 'left', // 表单label对其方式
				disabled: false, // 表单是否disabled
				// 表单所有组件全局配置
				global: {
					'*': {},
				},
				// 提交按钮配置
				submitBtn: {
					type: 'primary',
				}
        }
        this.deProps = { ...props, ...this.props }
        this.option = {
				form: {
					//行内表单模式
					inline: false,
					//表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
					labelPosition: this.deProps.labelPosition || 'left',
					//表单域标签的后缀
					labelSuffix: undefined,
					//是否显示必填字段的标签旁边的红色星号
					hideRequiredAsterisk: false,
					//表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
					labelWidth: this.deProps.labelWidth || '150px',
					//是否显示校验错误信息
					showMessage: true,
					//是否以行内形式展示校验信息
					inlineMessage: false,
					//是否在输入框中显示校验结果反馈图标
					statusIcon: false,
					//是否在 rules 属性改变后立即触发一次验证
					validateOnRuleChange: true,
					//是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
					disabled: this.deProps.disabled || false,
					//用于控制该表单内组件的尺寸 medium / small / mini
					size: 'medium',
				},
				global: this.deProps.global || {
					'*': {},
				},
				submitBtn: this.deProps.submitBtn || {
					type: 'primary',
				},
			}
        },
		//   组件内部值发生改变
		handleChange(filed, value, $f) {
			this.$emit('handleChange', $f)
		},
		handleOpen(row) {
			this.dialogFormVisible = true
			this.$nextTick(() => {
				if (this.form && row) {
					this.editId = row.id // 编辑id
					this.form.setValue(row)
					this.$emit('handleChange', this.form) // 初始化change
				}
			})
		},

		handleSubmit(formData) {
			this.form.submitBtnProps({ loading: true })
			// 过滤掉无值属性
			for (const k in formData) {
				if (!formData[k] && formData[k] !== 0) delete formData[k]
			}
			if (this.editId) formData.id = this.editId
			this.$emit('beforeSubmit', formData) // 提交前回调
			console.log('params', formData)
			// callBack为回调函数，在上层组件中可以重新设置formData值
			this.submitFunc(formData)
				.then((res) => {
					if (res) {
						this.$emit('afterSubmit', res) // 提交后回调
						this.$message({
							type: 'success',
							message: '操作成功！',
						})
						this.dialogFormVisible = false
					}
					// 操作成功以后关闭提交加载按钮
					this.form.submitBtnProps({ loading: false })
				})
				.catch((err) => {
					this.dialogFormVisible = false
					this.form.submitBtnProps({ loading: false })
				})
		},
	},
}
</script>
<style lang="less" scoped></style>
