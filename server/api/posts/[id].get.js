import posts from '~/server/posts.js';

export default defineEventHandler((event) =>
{
	const id = getRouterParam(event, 'id');

	const findedPost = posts.find(el => `${el.id}` === id);

	if (!findedPost)
		throw createError({
			statusCode: 404,
			statusMessage: 'Пост не найден',
		});

	return findedPost;
});
