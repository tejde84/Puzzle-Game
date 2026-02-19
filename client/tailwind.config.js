module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#0047AB",
        brandGray: "#F5F5F5",
        brandGreen: "#00A86B",
      },
    },
  },
  plugins: [],
};
export const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001/api";