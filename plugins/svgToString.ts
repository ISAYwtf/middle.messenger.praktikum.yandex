import { readFileSync } from 'fs';
import { extname } from 'path';

/** Плагин, позволяющий импортировать svg элементы в виде строки */
export default function svgToString() {
    return {
        name: 'svg-to-string',
        transform(_: string, id: string) {
            if (extname(id) !== '.svg') {
                return null;
            }

            const svgContent = readFileSync(id, 'utf-8');
            const escapedSvgContent = JSON.stringify(svgContent);

            return {
                code: `export default ${escapedSvgContent};`,
                map: null
            };
        }
    };
}
