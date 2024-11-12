export const getLocalStorage = () =>
   JSON.parse(localStorage.getItem("nuxt-mp3") || "{}") as Record<string, any>;

export const setLocalStorage = (key: string, value: any) => {
   const storage = getLocalStorage();
   storage[key] = value;

   return localStorage.setItem("nuxt-mp3", JSON.stringify(storage));
};
