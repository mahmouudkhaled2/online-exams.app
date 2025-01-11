import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "sub-color": "#696F79",
        main: "#4461f2",
      },
      boxShadow: {
        'r': '0px 5px 100px 0px rgba(0, 0, 0, 0.1)',
        'userCard': '0px 0px 20px 0px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        main: '#4461f2'
      },
      fontFamily: {
        poppins: `"Poppins", sans-serif`,
        Inter: `"Inter", sans-serif`,
      },
      clipPath: {
        circle: 'circle(50%)',
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
