/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        color: "rgba(var(--color))",
        //  theme primary colors
        "primary-a0": "rgba(var(--clr-primary-a0))",
        "primary-a10": "rgba(var(--clr-primary-a10))",
        "primary-a20": "rgba(var(--clr-primary-a20))",
        "primary-a30": "rgba(var(--clr-primary-a30))",
        "primary-a40": "rgba(var(--clr-primary-a40))",
        "primary-a50": "rgba(var(--clr-primary-a50))",
        //  theme surface colors
        "surface-a0": "rgba(var(--clr-surface-a0))",
        "surface-a10": "rgba(var(--clr-primary-a10))",
        "surface-a20": "rgba(var(--clr-primary-a20))",
        "surface-a30": "rgba(var(--clr-primary-a30))",
        "surface-a40": "rgba(var(--clr-primary-a40))",
        "surface-a50": "rgba(var(--clr-primary-a50))",
        // theme tonal surface colors
        "surface-tonal-a0": "rgba(var(--clr-surface-tonal-a0))",
        "surface-tonal-a10": "rgba(var(--clr-surface-tonal-a10))",
        "surface-tonal-a20": "rgba(var(--clr-surface-tonal-a20))",
        "surface-tonal-a30": "rgba(var(--clr-surface-tonal-a30))",
        "surface-tonal-a40": "rgba(var(--clr-surface-tonal-a40))",
        "surface-tonal-a50": "rgba(var(--clr-surface-tonal-a50))",
        // card with background
        "card-with-bg-bg": "rgba(var(--card-with-bg-bg))",
        "card-with-bg-text": "rgba(var(--card-with-bg-text))",
        "card-with-bg-icon": "rgba(var(--card-with-bg-icon))",
        "card-with-bg-btn-border": "rgba(var(--card-with-bg-btn-border))",
        "card-with-bg-btn-hover": "rgba(var(--card-with-bg-btn-hover))",
        // card without bg
        "card-bg": "rgba(var(--card-without-bg-bg))",
        "card-text": "rgba(var(--card-without-bg-text))",
        "card-icon": "rgba(var(--card-without-bg-icon))",
        "card-btn-border": "rgba(var(--card-without-bg-border))",
        // btn
        "btn-bg": "rgba(var(--btn-bg))",
        "btn-text": "rgba(var(--btn-text))",
        "btn-icon": "rgba(var(--btn-icon))",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
/*
extend: {
colors:{
  sidebar:{
    active:"#6b32ec",
    bacground:"#f5f5ff",
    iconColor:"636c80"
  }
}
}
*/
/*
className="text-sidebar-active"
*/
