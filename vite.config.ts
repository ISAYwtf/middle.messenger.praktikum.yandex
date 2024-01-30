import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import svgToString from './plugins/svgToString';
import * as path from 'node:path';

export default defineConfig({
    plugins: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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
            '@types': path.resolve(__dirname, './src/types'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@store': path.resolve(__dirname, './src/store'),
            '@api': path.resolve(__dirname, './src/api'),
            '@services': path.resolve(__dirname, './src/services'),
        }
    },
});
