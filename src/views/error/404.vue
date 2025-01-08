<template>
	<div class="crumbs">404</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const home = () => {
	router.push('/')
}
</script>
