import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
import Inspect from 'vite-plugin-inspect'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://cn.vitejs.dev/config/
export default defineConfig(({ mode }) => {
	// 设置默认运行的浏览器
	process.env.BROWSER = 'chrome'
	const env = loadEnv(mode, process.cwd())
	console.log('env', env)
	return {
		plugins: [
			vue(),
			Inspect(),
			Components({
				resolvers: [AntDesignVueResolver({ importStyle: false })]
			}),
			viteMockServe({
				// 存放模拟数据的目录路径
				mockPath: 'mock',
				// 是否开启 mock 功能
				enable: mode === 'development',
				// 是否在控制台显示请求日志
				logger: false
			})
		],
		resolve: {
			alias: {
				'@': path.resolve('./src')
			},
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
		},
		server: {
			host: '0.0.0.0',
			port: 4000,
			open: true
			// proxy: {
			// 	'/api': {
			// 		target: 'http://192.168.1.143:5050',
			// 		changeOrigin: true,
			// 		rewrite: path => path.replace(/^\/api/, '/wyc/api')
			// 	}
			// }
		},
		esbuild: {
			// 生产环境移除console和debugger
			drop: mode === 'production' ? ['console', 'debugger'] : []
		}
	}
})
