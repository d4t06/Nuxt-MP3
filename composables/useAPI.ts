import type { UseFetchOptions } from "#app";

// interface CustomError {
//   message: string
//   status: number
// }

export function useAPI<T>(url: string, options?: UseFetchOptions<T>) {

	return useFetch(url, {
		...options,
		$fetch: useNuxtApp().$api as typeof $fetch,
	});
}

