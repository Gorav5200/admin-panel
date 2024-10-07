/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans"], // "inter" is the font name, and "sans" is the generic font family
      },

      fontWeight: {
        bold: 700,
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--light-grey)",
        
      },
      backgroundImage: {
        "auth-background": 'url("/public/backgroundImages/bg-auth.png")',
      },
    
      container: {
        center: true,
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman',
      }
      
    },
  },
  plugins: [],
};
