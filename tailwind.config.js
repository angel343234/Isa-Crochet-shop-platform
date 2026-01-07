/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-pink': '#c11d6e',
                'brand-light': '#fae8f2',
                'brand-dark': '#9c3167',
                'brand-secondary': '#f3b1d6',
                'brand-accent': '#b6628f',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Lato"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}