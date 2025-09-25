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
         link: [{rel:'icon', type: 'image/svg+xml', href:'./favicon.svg'}]
      },
   },

   modules: ["@nuxtjs/google-fonts", "@pinia/nuxt", "@sidebase/nuxt-auth"],
   googleFonts: {
      families: {
         Inter: ["500..700"],
      },
   },
   runtimeConfig: {
      public: {
         apiBase: process.env.NUXT_PUBLIC_API_BASE,
      },
   },
   auth: {
      isEnabled: true,
      provider: {
         type: "local",
         endpoints: {
            signIn: { path: "", method: "post" },
            getSession: { path: "", method: "get" },
         },
         pages: {
            login: "/login",
         },
         session: {
            dataType: {
               token: "string",
            },
         },
      },
   },
});
