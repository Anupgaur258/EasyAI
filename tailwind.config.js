/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                darkBg: "#0A1F2B", // Dark background
                darkGradient: "#1A3C4A", // Gradient for background
                neonGreen: "#00FF99", // Neon green (replacing greenAccent)
                neonBlue: "#00DDEB", // Neon blue
                neonPurple: "#D81BFF", // Neon purple
            },
        },
    },
    plugins: [],
};