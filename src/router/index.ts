import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(to => {
	if (to.params.pathMatch) return
	NProgress.start()
})

const HAS_TITLE_SUFFIX = import.meta.env.VITE_BOM_SHOW_SUFFIX_TITLE === 'true'

const APP_TITLE = import.meta.env.VITE_APP_TITLE

router.afterEach(to => {
	const title = to.meta.title + (HAS_TITLE_SUFFIX ? ' - ' + APP_TITLE : '')
	document.title = title
	NProgress.done()
})

export default router
