<template>
	<NuxtLayout name="default">
		<div class="posts">
			<div class="posts-grid container">
				<PostCard
					v-for="post in posts"
					:id="post.id"
					:key="post.id"
					:title="post.title"
					:picture="post.picture"
					:description="post.description"
					:date="post.date"
				/>
			</div>
			<PaginationVue
				:current-page="meta.page"
				:per-page="meta.perPage"
				:total="meta.totalPosts"
				:total-pages="meta.totalPages"
				@change="paginate"
			/>
			<OfferNewsButton />
		</div>
	</NuxtLayout>
</template>

<script setup>
import { useStore } from 'vuex';

import OfferNewsButton from '~/components/OfferNewsButton.vue';
import PostCard from '~/components/PostCard.vue';
import PaginationVue from '~/components/UI/Pagination.vue';

const instance = getCurrentInstance();
const store    = useStore();
const route    = useRoute();

const meta  = ref({
	page: 1,
	perPage: 9,
	totalPosts: 0,
	totalPages: 0,
});
const posts = ref([]);

const { _fetchPosts } = usePosts();

const fetchPosts = async () =>
{
	store.commit('enableLoading', instance.uid);

	const { data, error } = await _fetchPosts(meta.value.page, meta.value.perPage);

	if (error.value)
	{
		// eslint-disable-next-line no-console
		console.log('fetchPosts', error.value);
		return;
	}

	posts.value = data.value.posts;
	meta.value = data.value.meta;

	store.commit('disableLoading', instance.uid);
};

const paginate = (nextPage) =>
{
	meta.value.page = nextPage;

	fetchPosts();

	savePageNumberInUrl();
};

const savePageNumberInUrl = () =>
{
	if (process.server)
		return;

	const url = new URL(window.location);

	url.searchParams.set('page', meta.value.page);

	if (window.location.search === url.search)
		return;

	window.history.pushState({}, '', url);
};

const checkQueryParams = () =>
{
	const page = Number(route.query?.page || 0);

	if (!page)
		return;

	meta.value.page = page;
};

checkQueryParams();

await fetchPosts();
</script>

<style lang="scss">
	.posts-grid
	{
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 20px;
		margin-bottom: 50px;
	}

	@media (min-width: $mobile)
	{
		.posts-grid
		{
			grid-template-columns: 1fr 1fr;
			grid-gap: 40px;
		}
	}

	@media (min-width: $lg)
	{
		.posts-grid
		{
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	@media (min-width: $wd)
	{
		.posts-grid
		{
			grid-gap: 40px 60px;
		}
	}
</style>
