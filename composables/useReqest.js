export const useRequest = (request, options = {}) =>
{
	const runtimeConfig = useRuntimeConfig();

	request = runtimeConfig.public.API_URL + request;

	return useFetch(request, options);
};
