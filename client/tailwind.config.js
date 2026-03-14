/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
        },
        surface: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#cbd5e1',
          400: '#94a3b8',
          500: '#f1f5f9',
          600: '#64748b',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        border: '#e2e8f0',
        success: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        secondary: {
          50: '#f8fafc',
          500: '#3b82f6',
          600: '#2563eb',
        }
      },
    },
  },
}

