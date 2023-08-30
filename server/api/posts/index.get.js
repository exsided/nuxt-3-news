import posts from '~/server/posts.js';

export default defineEventHandler((event) =>
{
	const queryParams = getQuery(event);

	const page    = Number(queryParams.page);
	const perPage = Number(queryParams.perPage || 10);

	const postsCount = posts.length;

	const startPos = (page - 1) * perPage;
	const endPos   = startPos + perPage;

	const response = {
		posts: posts.slice(startPos, endPos).map(el => ({
			id: el.id,
			title: el.title,
			picture: el.picture,
			description: el.description,
			date: el.date,
		})),
		meta:
		{
			page,
			perPage,
			totalPosts: postsCount,
			totalPages: Math.ceil(postsCount / perPage),
		}
	};

	return response;
});
