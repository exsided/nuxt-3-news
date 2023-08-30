<template>
	<form class="post-submit-form" @submit.prevent="submit">
		<Transition>
			<p
				v-if="success"
				class="post-submit-form__success"
			>
				Ваш пост успешно отправлен
			</p>
		</Transition>
		<UiInput
			v-model="form.title"
			label="Заголовок статьи"
			:error="$v.title?.$error"
			:error-text="getFieldErrorText('title')"
		/>
		<UiInput
			v-model="form.picture"
			label="Ссылка на картинку"
			:error="$v.picture?.$error"
			:error-text="getFieldErrorText('picture')"
		/>
		<UiInput
			v-model="form.description"
			label="Описание статьи"
			textarea
			:error="$v.description?.$error"
			:error-text="getFieldErrorText('description')"
		/>
		<UiInput
			v-model="form.content"
			label="Контент статьи"
			textarea
			:error="$v.content?.$error"
			:error-text="getFieldErrorText('content')"
		/>
		<button
			class="button button--blue"
			:disabled="loading"
		>
			Отправить
		</button>
	</form>
</template>

<script setup>
	import { useStore } from 'vuex';

	import { useVuelidate } from '@vuelidate/core';
	import { required } from '@vuelidate/validators';

	import UiInput from '~/components/UI/Input.vue';

	const instance = getCurrentInstance();
	const store    = useStore();

	const form = reactive({
		title: '',
		picture: '',
		description: '',
		content: '',
	});

	const rules =
	{
		title: { required },
		description: { required },
		content: { required },
	};

	const success = ref(false);
	const loading = ref(false);

	const $v = useVuelidate(rules, form);

	const { _submitPost } = usePosts();

	const submit = async () =>
	{
		$v.value.$touch();

		if ($v.value.$error)
			return;

		store.commit('enableLoading', instance.uid);

		const today = new Date();

		const month = `${today.getMonth() + 1}`.padStart(2, '0');
		const day = `${today.getDate()}`.padStart(2, '0');
		const year = today.getFullYear();

		await _submitPost({
			title: form.title,
			picture: form.picture,
			description: form.description,
			content: form.content,
			date: `${day}.${month}.${year}`,
		});

		success.value = true;

		form.title = '';
		form.picture = '';
		form.description = '';
		form.content = '';

		$v.value.$reset();

		store.commit('disableLoading', instance.uid);
	};

	const getFieldErrorText = (field) =>
	{
		if (!$v?.value?.[field]?.$error)
			return;

		return $v?.value?.[field].$errors[0]?.$message || '';
	};
</script>

<style lang="scss">
	.post-submit-form__success
	{
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 20px;
		color: #47BA61;
	}
</style>
