<template>
	<NuxtLink :to="link" class="go-back g-link">
		← {{ text }}
	</NuxtLink>
</template>

<script setup>
defineProps({
	link:
	{
		type: String,
		default: '/'
	},
	text:
	{
		type: String,
		default: 'Назад'
	},
});
</script>

<style lang="scss">
	.go-back
	{
		display: block;
		margin-bottom: 15px;
		width: fit-content;
	}
</style>
