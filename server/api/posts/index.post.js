import posts from '~/server/posts.js';

export default defineEventHandler(async (event) =>
{
	const body = await readBody(event);
	const lastPostId = posts[posts.length - 1]?.id || 0;

	posts.push({
		id: lastPostId + 1,
		title: body.title || '',
		picture: body.picture || '',
		description: body.description || '',
		content: body.content || '',
		date: body.date || '',
	});

	return { body };
});
