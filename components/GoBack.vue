<template>
	<NuxtLink
		v-if="history"
		:to="link"
		class="go-back g-link"
	>
		← {{ text }}
	</NuxtLink>
	<button
		v-else
		class="go-back g-link"
		@click="router.back()"
	>
		← {{ text }}
	</button>
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
	history:
	{
		type: Boolean,
		default: false,
	},
});

const router = useRouter();
</script>

<style lang="scss">
	.go-back
	{
		display: block;
		margin-bottom: 15px;
		width: fit-content;
	}
</style>
