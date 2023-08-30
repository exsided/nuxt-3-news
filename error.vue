<template>
	<NuxtLayout name="default">
		<div class="container">
			<h1>
				404
			</h1>
			<NuxtLink to="/">
				К списку новостей
			</NuxtLink>
		</div>
	</NuxtLayout>
</template>

<script setup>
useHead({ title: 'Произошла ошибка' });
</script>

<style>

</style>
