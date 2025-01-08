<template>
	<div class="SviAnL-header-box">
		<header class="header-main header-visible">
			<div class="header-container">
				<div @click="changeTheme('light')">明亮</div>
				<div @click="changeTheme('dark')">暗黑{{ all }}</div>
				<div @click="changeTheme('auto')">跟随系统 {{ testCount }}</div>
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
.SviAnL-header-box {
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
	align-items: center;
	height: 100%;
	width: 100%;
	max-width: 1440px;
	margin: auto;
	position: relative;
}
</style>
