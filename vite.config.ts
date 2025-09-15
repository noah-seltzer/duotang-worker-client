import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import path from 'path'
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
            routesDirectory: './src/react-app/routes'
        }),
        cloudflare(),
        sentryVitePlugin({
            org: 'noah-seltzer',
            project: 'duotang-worker-client',
            authToken: process.env.SENTRY_AUTH_TOKEN
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/react-app')
        }
    },

    build: {
        sourcemap: true,
        outDir: 'dist'
    }
})