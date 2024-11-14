export const chekcDisable = (b: boolean) => {
   return b ? "disabled" : "";
};

export const sleep = (time: number) => new Promise((rs) => setTimeout(rs, time));

export const API_ENDPOINT = `${
   process.env.NUXT_PUBLIC_API_ENDPOINT || "https://nest-mp3.vercel.app/api"
}`;
