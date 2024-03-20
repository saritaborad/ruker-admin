/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

// module.exports = {
//   content: ["./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
// ],
//   theme: {
//     extend: {},

//   },
//   plugins: [nextui()],
// }
const config = {
  content: ["./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        spacingUnit: 4, // in px
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "2rem", // text-medium
          large: "1.125rem", // text-large
          
        },  
        
      },
      
        themes: {
          light: {
            layout: {
            },
          },
          dark: {
            layout: {
            },
          },
        },
    }),
  ],
};
export default config;
