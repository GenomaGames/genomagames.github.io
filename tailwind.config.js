/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#172032",
          "200": "#111226",
          "300": "rgba(255, 255, 255, 0.1)",
        },
        white: "#fff",
        "Color-Main": "#0bb3de",
        "Color-Light": "#8ee8ff",
        "color-4": "#ffe015",
        "color-3": "#d946ef",
        "color-2": "#8b5cf6",
        darkslategray: {
          "100": "#2c3944",
          "200": "rgba(30, 45, 58, 0.8)",
        },
        burlywood: "rgba(255, 200, 158, 0.1)",
      },
      fontFamily: {
        "josefin-sans": "'Josefin Sans'",
        "born2bsporty-fs": "'Born2bSporty FS'",
      },
      borderRadius: {
        "lg-9": "18.9px",
        "6xs": "7px",
        "4xs-1": "8.1px",
        "51xl": "70px",
      },
      padding: {
        "21xl": "40px",
        "109xl": "128px",
        "42xl": "61px",
        "5xs-1": "7.1px",
        "mini-2": "14.2px",
        "29xl": "48px",
      },
    },
    fontSize: {
      base: "16px",
      xl: "20px",
      "45xl": "64px",
      "13xl": "32px",
      "mini-2": "14.2px",
      sm: "14px",
      lg: "18px",
      "5xl": "24px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
