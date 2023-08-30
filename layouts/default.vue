<template>
	<div class="layout">
		<HeaderVue	/>
		<main class="main">
			<slot />
		</main>
		<MainLoader />
	</div>
</template>

<script setup>
	import HeaderVue from '~/components/Header.vue';
	import MainLoader from '~/components/MainLoader.vue';
</script>

<style lang="scss">
	.main
	{
		padding: 60px 0 100px;
	}
</style>
