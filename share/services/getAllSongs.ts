export default async function getAllSongs() {
   const runtimeConfig = useRuntimeConfig();

   const { data } = await useFetch<{ data: { songs: Song[] } }>(
      `${runtimeConfig.public.apiBase}/songs`
   );

   return data ? data.value?.data.songs : undefined
}
