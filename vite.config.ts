import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        tanstackRouter({ target: 'react', autoCodeSplitting: true, routesDirectory: './src/react-app/routes'}),
        cloudflare()
    ]
})
