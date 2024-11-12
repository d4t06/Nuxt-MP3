// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2024-04-03",
   devtools: { enabled: false },

   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   },

   css: ["./global.css"],

   app: {
      head: {
         title: "Nuxt MP3",
      },
   },

   modules: ["@nuxtjs/google-fonts", "@pinia/nuxt"],
   googleFonts: {
      families: {
         Inter: ["500..700"],
      },
   },
   runtimeConfig: {
      public: {
         apiBase: process.env.NUXT_PUBLIC_API_BASE || "https://nest-mp3.vercel.app/api",
      },
   },
});
