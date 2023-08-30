<template>
	<NuxtLayout name="default">
		<div class="request">
			<div class="container">
				<div class="request__wr">
					<GoBack text="К списку новостей" />
					<PostSubmitForm />
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import PostSubmitForm from '~/components/PostSubmitForm.vue';
import GoBack from '~/components/GoBack.vue';

useHead({
	title: 'Предложить новость',
	description: '',
});
</script>

<style lang="scss">
	.request__wr
	{
		max-width: 500px;
		margin-right: auto;
		margin-left: auto;
	}
</style>
