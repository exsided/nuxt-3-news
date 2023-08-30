import { createStore } from 'vuex';

export default createStore({
	state: () => ({
		loadingUids: [],
		cachedPosts: {},
	}),

	mutations:
	{
		enableLoading(state, uid)
		{
			state.loadingUids.push(uid);
		},
		disableLoading(state, uid)
		{
			state.loadingUids = state.loadingUids.filter(el => el !== uid);
		},
		pushPostInCache(state, post)
		{
			state.cachedPosts[post.id] = post;
		},
	},

	getters:
	{
		cachedPost(state)
		{
			return id => state[id];
		},
	}
});
