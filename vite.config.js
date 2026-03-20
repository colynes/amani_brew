import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'; // 1. Add this import

export default defineConfig({
    resolve: {
        alias: {
            // 2. Use path.resolve for the alias
            '@': path.resolve(__dirname, './resources/js'),
        },
        // 3. Add extensions to prioritize .ts over .js
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    plugins: [
        laravel({
            input: [
              'resources/css/app.css', 
              'resources/js/app.tsx'
            ],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});