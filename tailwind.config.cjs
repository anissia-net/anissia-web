/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['var(--font-family-sans)'],
                'serif': ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
                'mono': ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
            },
        },
    },
    plugins: [],
    darkMode: 'class'
}