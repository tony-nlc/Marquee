/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 10s linear infinite',
        marqueeVertical: 'marqueeVertical 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeVertical: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
}