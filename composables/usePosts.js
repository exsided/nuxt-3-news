export const usePosts = () =>
{
	const config = useRuntimeConfig();

	const _fetchPosts = async (page = 1, perPage = 10) => await useRequest(`/posts?perPage=${perPage}&page=${page}`);

	const _fetchPostById = async (id) => await useRequest(`/posts/${id}`);

	const _submitPost = async (payload) => await useRequest('/posts', { method: 'POST', body: payload });

	return {
		_fetchPosts,
		_fetchPostById,
		_submitPost,
	};
};
