<template>
	<div id="__layout">
		<Header :all="all" :testCount="test"></Header>
		<div class="list" @click=";(test as number)++">
			<div class="item-1"></div>
			<div class="item-2"></div>
			<div class="item-3"></div>
		</div>
		<div class="input-container">
			<input
				ref="el"
				class="gradient-input"
				placeholder="请输入内容"
				type="text"
			/>
		</div>
		<RingChart
			:ratioList="[
				{ ratio: 0.3, color: '#95210a' },
				{ ratio: 0.6, color: '#33FF57' },
				{ ratio: 0.1, color: '#3357FF' }
			]"
			:size="100"
			:storkWidth="10"
		></RingChart>
		<RingChart></RingChart>
	</div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef, onMounted } from 'vue'
import type { Ref } from 'vue'
import Header from '@/layouts/Header.vue'
import RingChart from '@/components/common/RingChart.vue'

const random = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min

console.log(random(1, 100)) // 输出 1 到 100 之间的随机整数

const unique = (arr: number[]) => [...new Set(arr)]

console.log(unique([1, 2, 2, 3, 4, 4, 5])) // [1, 2, 3, 4, 5]

const type = (value: any) =>
	Object.prototype.toString.call(value).slice(8, -1).toLowerCase()

console.log(type(123)) // 'number'
console.log(type([])) // 'array'
console.log(type(null)) // 'null'
console.log(type(undefined)) // 'undefined'

const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj))

const obj = { a: 1, b: { c: 2 } }
const copy = deepClone(obj)
console.log(copy) // { a: 1, b: { c: 2 } }

let a = 1,
	b = 2
;[a, b] = [b, a]
console.log(a, b) // 2, 1

const uuid = () =>
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = (Math.random() * 16) | 0
		return c === 'x' ? r.toString(16) : ((r & 0x3) | 0x8).toString(16)
	})

console.log(uuid()) // 类似 'e4e6c7c4-d5ad-4cc1-9be8-d497c1a9d461'

// typescript
let isActive: Boolean // 类型是 Boolean 对象
isActive = new Boolean(true) // 正确，赋值为 Boolean 对象
// isActive = true // 正确，基本布尔值也可以兼容
console.log('isActive', isActive.valueOf())

const test: Ref<string | number> = ref(29)

const all = ref<string>('嘿嘿嘿')

// const el = ref<HTMLInputElement | null>(null)
const el = useTemplateRef<HTMLInputElement>('el')
onMounted(() => {
	el.value?.focus()
})
</script>
<style lang="scss" scoped>
.list {
	display: flex;
	width: 500px;
}

.list > div {
	height: 50px;
}

.item-1 {
	background: pink;
}

.item-2 {
	background: lightblue;
}

.item-3 {
	background: gray;
}

.item-1 {
	flex: 1 1 0%;
}

.item-2 {
	flex: 1 1 auto;
}

.item-3 {
	flex: 1 1 200px;
}

/* 输入框容器 */
.input-container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 25vh;
	width: 25vw;
	padding: 2vh 2vw;
	background: #f4f4f9;
}

/* 渐变边框输入框 */
.gradient-input {
	width: 100%;
	height: 40px;
	padding: 5px 12px;
	font-size: 16px;
	font-family: 'Arial', sans-serif;
	color: #333;
	outline: none;

	/* 渐变边框 */
	border: 1px solid transparent;
	background: linear-gradient(white, white) padding-box,
	linear-gradient(45deg, #ff7eb3, #65d9ff, #c7f464, #ff7eb3) border-box;
	border-radius: 20px;

	/* 平滑过渡 */
	transition: background 0.3s ease, box-shadow 0.3s ease;
}

/*

/* Hover 状态 */
.gradient-input:hover {
	background: linear-gradient(white, white) padding-box,
	linear-gradient(135deg, #ff0076, #1eaeff, #28ffbf, #ff0076) border-box;
	box-shadow: 0 0 5px rgba(255, 0, 118, 0.5), 0 0 20px rgba(30, 174, 255, 0.5);
}

/* Focus 状态 */
.gradient-input:focus {
	background: linear-gradient(white, white) padding-box,
	linear-gradient(45deg, #ff0076, #1eaeff, #28ffbf, #ff0076) border-box;
	box-shadow: 0 0 15px rgba(255, 0, 118, 0.7),
	0 0 25px rgba(30, 174, 255, 0.7);
	color: #000; /* 聚焦时文本颜色 */
}

/* Placeholder 样式 */
.gradient-input::placeholder {
	color: #aaa;
	font-style: italic;
}
</style>
