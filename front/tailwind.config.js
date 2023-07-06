/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        drop: {
          "0%": {
            transform: "translateY(-60%)",
          },
        },
        show: {
          "0%": {
            transform: "scale(0.4)",
          },
        },
      },
      animation: {
        modal: "drop 0.5s ease-in-out",
        show: "show 0.7s ease-in-out",
      },
      gap: {
        15: "3.75rem",
      },
      colors: {
        white: "#FFFFFF",
        brand: {
          1: "#4529E6",
          2: "#5126EA",
          3: "#B0A6F0",
          4: "#EDEAFD",
        },
        gray: {
          0: "#0B0D0D",
          10: "#212529",
          20: "#495057",
          30: "#868E96",
          40: "#ADB5BD",
          50: "#CED4DA",
          60: "#DEE2E6",
          70: "#E9ECEF",
          80: "#F1F3F5",
          90: "#F8F9FA",
          100: "#FDFDFD",
        },
        opacity: {
          1: "#00000080",
        },
        feedback: {
          alert1: "#CD2B31",
          alert2: "#FDD8D8",
          alert3: "#FFE5E5",
          success1: "#18794E",
          success2: "#CCEBD7",
          success3: "#DDF3E4",
        },
        random: {
          1: "#E34D8C",
          2: "#C04277",
          3: "#7D2A4D",
          4: "#7000FF",
          5: "#6200E3",
          6: "#36007D",
          7: "#349974",
          8: "#2A7D5F",
          9: "#153D2E",
          10: "#6100FF",
          11: "#5700E3",
          12: "#30007D",
        },
      },
      fontSize: {
        sm: ["0.875rem", "1.5rem"],
        md: ["1rem", "1.25rem"],
        lg: ["1.25rem", "1.5625rem"],
        xl: ["1.5rem", "1.875rem"],
        "2xl": ["1.75rem", "2.1875rem"],
        "3xl": ["2rem", "2.5rem"],
        "4xl": ["2.25rem", "2.8125rem"],
        "4.5xl": ["2.75rem", "3.5rem"],
      },
      screens: {},
      fontFamily: {
        inter: "Inter, sans-serif",
        lexend: "Lexend, sans-serif",
      },
    },
  },
  plugins: [
    // ...
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
