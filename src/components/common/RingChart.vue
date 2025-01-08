<template>
	<canvas ref="canvasDom" style="border-radius: 50%"></canvas>
</template>

<script lang="ts" setup>
import { computed, nextTick, useTemplateRef, watchEffect } from 'vue'

interface Props {
	size?: number
	storkWidth?: number
	ratioList?: RatioItem[]
}

interface RatioItem {
	ratio: number
	color: string
}

const { size, storkWidth, ratioList } = defineProps<Props>()

// 默认画布宽高
const defaultSize = 200

// 默认画笔宽度
const defaultStorkWidth = 20

// 默认数据
const defaultRatioList: RatioItem[] = [{ ratio: 1, color: '#5470C6' }]

// canvas DOM
const canvasDom = useTemplateRef<HTMLCanvasElement>('canvasDom')

// 上下文
let ctx: CanvasRenderingContext2D | null = null

// 动态计算 canvas 的半径
const canvasSize = computed(() => size || defaultSize)

// 动态计算 canvas 的中心点
const center = computed(() => ({
	x: canvasSize.value / 2,
	y: canvasSize.value / 2
}))

const radius = computed(() => {
	let r = canvasSize.value / 2 - (storkWidth || defaultStorkWidth)
	return r > 0 ? r : canvasSize.value / 10
})

// 初始化 canvas
const initCanvas = () => {
	const dom = canvasDom.value
	if (!dom) return

	ctx = dom.getContext('2d')
	if (!ctx) return

	dom.width = canvasSize.value
	dom.height = canvasSize.value

	drawBackgroundCircle()
	drawDataRings()
}

// 绘制背景圆环
const drawBackgroundCircle = () => {
	if (!ctx) return
	drawCircle({
		ctx,
		x: center.value.x,
		y: center.value.y,
		radius: radius.value,
		lineWidth: storkWidth || defaultStorkWidth,
		color: '#C4C9CF4D',
		startAngle: -Math.PI / 2,
		endAngle: Math.PI * 1.5
	})
}

// 绘制数据圆环
const drawDataRings = () => {
	const ratioParam = ratioList || defaultRatioList
	if (!ctx) return

	let startAngle = -Math.PI / 2
	ratioParam.forEach(({ ratio, color }) => {
		const endAngle = startAngle + ratio * Math.PI * 2

		drawCircle({
			ctx: ctx as CanvasRenderingContext2D,
			x: center.value.x,
			y: center.value.y,
			radius: radius.value,
			lineWidth: storkWidth || defaultStorkWidth,
			color,
			startAngle,
			endAngle
		})

		startAngle = endAngle
	})
}

interface drawCircleType {
	ctx: CanvasRenderingContext2D
	x: number
	y: number
	radius: number
	lineWidth: number
	color: string
	startAngle: number
	endAngle: number
}

// 通用绘制函数
const drawCircle = ({
	ctx,
	x,
	y,
	radius,
	lineWidth,
	color,
	startAngle,
	endAngle
}: drawCircleType) => {
	ctx.beginPath()
	ctx.arc(x, y, radius, startAngle, endAngle)
	ctx.lineWidth = lineWidth
	ctx.strokeStyle = color
	ctx.stroke()
	ctx.closePath()
}

// 监听画布大小变化
watchEffect(() => {
	nextTick(() => {
		initCanvas()
	})
})
</script>

<style scoped></style>
