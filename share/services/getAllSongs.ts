import { API_ENDPOINT } from "../libs/appHelper";

export default async function getAllSongs() {
   const { data } = await useFetch<{ data: { songs: Song[] } }>(`${API_ENDPOINT}/songs`);

   return data ? data.value?.data.songs : undefined;
}
