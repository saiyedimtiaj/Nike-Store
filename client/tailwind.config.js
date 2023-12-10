const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Afacad: ["'Afacad', sans-serif"]
    },
    extend: {},
  },
  plugins: [],
});

