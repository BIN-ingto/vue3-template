<template>
	<div class="sviAnL-header-box">
		<header class="header-main header-visible">
			<div class="header-container">
				<div class="header-logo">
					<router-link to="/">
						<img src="/vite.svg?url" alt="" />
						SviAnL
					</router-link>
				</div>
				<div class="header-content">
					<div>
						<a-button type="primary">Primary Button</a-button>
					</div>
				</div>
			</div>
		</header>
	</div>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks/theme'

interface Props {
	testCount?: number | string
	all: string
}

const { testCount = 100, all } = defineProps<Props>()

const changeTheme = (theme: string) => {
	useTheme().setTheme(theme)
}

console.log('import.meta.env', import.meta.env)
</script>

<style scoped lang="scss">
.sviAnL-header-box {
	height: 5rem;
	position: relative;
	z-index: 1000;
}

.header-main {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	transition: transform 0.2s;
	transform: translate3d(0, -100%, 0);
	height: 5rem;
	color: var(--sv-text-1);
	font-size: 14px;
	background: var(--sv-header-bg);
	box-shadow: 0 2px 8px var(--sv-layer-3-fill);
	z-index: 999;
}

.header-visible {
	transform: translateZ(0);
}

.header-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	width: 100%;
	max-width: 1440px;
	margin: auto;
	position: relative;
}

.header-logo a {
	color: var(--sv-text-1);
	font-size: 16px;
	display: flex;
	align-items: center;
	transition: opacity 0.2s;

	img {
		width: 32px;
		height: 32px;
		margin-right: 6px;
	}

	&:hover {
		opacity: 0.7;
	}
}

.header-content {
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
</style>
