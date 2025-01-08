// 设置主题
function setTheme(theme: string) {
	const themes = {
		dark: 'dark',
		light: 'light',
		auto: 'auto'
	}

	if (!Object.keys(themes).includes(theme)) {
		throw new Error(
			`Invalid theme: ${theme}. Must be one of light, dark, or auto.`
		)
	}

	const classToAdd = themes[theme as keyof typeof themes]

	document.documentElement.classList.remove('dark', 'light', 'auto')

	document.documentElement.classList.add(classToAdd)

	if (theme === 'auto') {
		if ('matchMedia' in window) {
			const mediaQuery = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
			if (mediaQuery) {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.add('light')
			}
			themeListen()
		}
	} else {
		if ('matchMedia' in window) {
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', themeListen)
		}
	}

	localStorage.setItem('theme', theme)
}

// 监听系统主题
const themeListen = () => {
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (event: MediaQueryListEvent) => {
			if (event.matches) {
				document.documentElement.classList.add('dark')
				document.documentElement.classList.remove('light')
			} else {
				document.documentElement.classList.add('light')
				document.documentElement.classList.remove('dark')
			}
		})
}

// 初始化主题
function initTheme() {
	const theme = localStorage.getItem('theme')
	setTheme(theme ? theme : 'light')
}

export function useTheme() {
	return {
		setTheme,
		initTheme
	}
}
