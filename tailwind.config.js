const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
   corePlugins: {
      backgroundOpacity: false,
      textOpacity: false,
      borderOpacity: false,
   },
   content: [
      "./share/components/**/*.{js,vue,ts}",
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
   ],
   theme: {
      extend: {},
      fontFamily: {
         sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      container: {
         center: true,
         padding: "10px",
      },
   },
   plugins: [],
};
