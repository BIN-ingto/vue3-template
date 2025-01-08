import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * path: 路由路径
 * component: 路由组件
 * meta: 路由元信息
 * title: 路由标题
 * requiresAuth: 是否需要登录
 */

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('@/views/home/index.vue'),
		meta: { title: '首页' }
	},
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: { title: '登录' }
	},
	{
		path: '/:pathMatch(.*)',
		component: () => import('@/views/error/404.vue'),
		meta: { title: '404' }
	}
]

export default routes
