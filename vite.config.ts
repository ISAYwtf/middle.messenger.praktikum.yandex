import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import svgToString from './plugins/svgToString';
import * as path from 'node:path';

export default defineConfig({
    plugins: [
        // @ts-ignore
        handlebars(),
        svgToString(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
        }
    },
})
