//   全局引入scss
const cssImport = (config) => {
	const oneOfsMap = config.module.rule('scss').oneOfs.store
	oneOfsMap.forEach((item) => {
		item.use('sass-resources-loader')
			.loader('sass-resources-loader')
			.options({
				// 要公用的scss的路径
				resources: './examples/assets/styles/index.scss',
			})
			.end()
	})
}

const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = 'xdy-system' // 标题

const port = process.env.port || process.env.npm_config_port || 8080 // 端口

// vue.config.js 配置说明 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
module.exports = {
	// 部署生产环境和开发环境下的URL。 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
	// 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
	publicPath: process.env.NODE_ENV === 'production' ? './' : './',
	// 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
	outputDir: 'dist',
	// 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
	assetsDir: 'static',
	// 是否开启eslint保存检测，有效值：ture | false | 'error'
	lintOnSave: process.env.NODE_ENV === 'development',
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	productionSourceMap: false,
	pages: {
		index: {
			entry: 'examples/main.js', //入口文件
			template: 'public/index.html',
			filename: 'index.html',
		},
	},
	// webpack-dev-server 相关配置
	devServer: {
		host: '0.0.0.0',
		port: port,
		open: true,
		proxy: {
			// detail: https://cli.vuejs.org/config/#devserver-proxy
			[process.env.VUE_APP_BASE_API]: {
				target: `http://localhost:8080`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: '',
				},
			},
		},
		disableHostCheck: true,
	},
	configureWebpack: {
		name: name,
		resolve: {
			alias: {
				'@': resolve('examples'),
			},
		},
	},
	chainWebpack(config) {
		cssImport(config)
		config.plugins.delete('preload') // TODO: need test
		config.plugins.delete('prefetch') // TODO: need test
		// set svg-sprite-loader
		config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			})
			.end()

		config.when(process.env.NODE_ENV !== 'development', (config) => {
			config
				.plugin('ScriptExtHtmlWebpackPlugin')
				.after('html')
				.use('script-ext-html-webpack-plugin', [
					{
						// `runtime` must same as runtimeChunk name. default is `runtime`
						inline: /runtime\..*\.js$/,
					},
				])
				.end()
		})
	},
}
