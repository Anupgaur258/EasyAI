/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                darkBg: "#0A1F2B",
                darkGradient: "#1A3C4A",
                neonGreen: "#00FF99",
                neonBlue: "#00DDEB",
                neonPurple: "#D81BFF",
                sidebarBg: "#1F2A44", // Dark sidebar color from the image
                boardBg: "#F5F6FA", // Light background from the image
                cardBlue: "#4A90E2", // Blue for "New board" card
                stickyYellow: "#FFF9B1", // Yellow for sticky notes
                stickyOrange: "#FFCC80", // Orange for sticky notes
            },
        },
    },
    plugins: [],
};