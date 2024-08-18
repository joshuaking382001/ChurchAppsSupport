// tailwind.config.js
module.exports = {
  content: [
    "./src/app/*.{js,jsx,ts,tsx}", 
    "./src/app/comp/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./public/**/*.html", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
