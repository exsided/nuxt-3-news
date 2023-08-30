<template>
	<NuxtLayout name="default">
		<div v-if="postData" class="post-detail">
			<div class="container">
				<div class="post-detail__heading">
					<GoBack />
					<h1 class="post-detail__title">
						{{ postData.title }}
					</h1>
					<p v-if="postData.date" class="post-detail__date">
						Дата публиакации: {{ dateFromatter(postData.date) }}
					</p>
					<p
						v-if="postData.description"
						v-html="postData.description"
						class="post-detail__description"
					/>
				</div>
				<div class="post-detail__content" v-html="postData.content" />

				<OfferNewsButton />
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
	import { useStore } from 'vuex';

	import OfferNewsButton from '~/components/OfferNewsButton.vue';
	import GoBack from '~/components/GoBack.vue';

	const instance = getCurrentInstance();
	const router = useRouter();
	const store    = useStore();

	const postData = ref(null);

	const { _fetchPostById } = usePosts();

	const fetchPost = async (postId) =>
	{
		const { data, error } = await _fetchPostById(postId);

		if (error.value)
		{
			showError();
			return;
		}

		postData.value = data.value;

		store.commit('pushPostInCache', postData.value);
	};

	const getPostDetail = async () =>
	{
		store.commit('enableLoading', instance.uid);

		const postId = router.currentRoute.value.params.id;

		if (!router.currentRoute.value.params.id)
		{
			showError();
			return;
		}

		const postFromCache = store.getters.cachedPost(postId);

		if (postFromCache)
			postData.value = postFromCache;
		else
			await fetchPost(postId);

		store.commit('disableLoading', instance.uid);
	};

	const showError = () =>
	{
		throw createError({ statusCode: 404, statusMessage: 'Страница не найдена', fatal: true });
	};

	await getPostDetail();

	useHead({
		title: postData.value.title,
		description: postData.value.description,
	});
</script>

<style lang="scss">
	.post-detail__title
	{
		font-family: 'Ubuntu';
		font-size: 36px;
		line-height: 38px;
		margin: 0 0 30px;
	}
	.post-detail__date
	{
		font-size: 14px;
		line-height: 16px;
		color: $gray;
		margin: 0 0 15px;
	}
	.post-detail__description
	{
		font-style: italic;
		font-size: 18px;
		line-height: 20px;
		font-weight: normal;
		margin: 0;
	}
	.post-detail__content
	{
		margin-bottom: 60px;

		p
		{
			font-size: 18px;
			line-height: 22px;
			margin-bottom: 20px;
		}

		ul
		{
			padding-left: 20px;
		}
		li
		{
			font-size: 16px;
			line-height: 18px;
			margin-bottom: 10px;
		}

		h3
		{
			font-family: 'Ubuntu';
			font-size: 26px;
			line-height: 28px;
		}
	}

	.post-detail__heading
	{
		margin: 0 -20px 50px;
		padding: 20px;
		box-shadow: rgba(93, 95, 107, 0.1) 0px 0px 30px;
	}

	@media (min-width: $tablet)
	{
		.post-detail__title
		{
			font-size: 54px;
			line-height: 58px;
			margin-bottom: 40px;
		}
		.post-detail__heading
		{
			margin-bottom: 80px;
			padding: 30px;
		}

		.post-detail__content
		{
			max-width: 90%;
			margin-right: auto;
			margin-left: auto;
		}
	}

	@media (min-width: $wd)
	{
		.post-detail__heading
		{
			margin-bottom: 100px;
		}
	}
</style>
