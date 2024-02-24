import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parse } from 'node:path';

const EXTENSIONS = {
    hbs: ['hbs', 'hbs?raw'],
    svg: ['svg'],
}

const matchFormat = (ext) => {
    let matchedFormat = null;
    Object.entries(EXTENSIONS).some(([format, extensions]) => {
        const resolvedExtensions = extensions.map((el) => `.${el}`);
        if (resolvedExtensions.includes(ext)) {
            matchedFormat = format;
            return true;
        }
        return false;
    });

    return matchedFormat;
}

export async function resolve(specifier, context, next) {
    const nextResult = await next(specifier, context);

    const extension = parse(specifier).ext;
    const matchedFormat = matchFormat(extension);
    if (!matchedFormat) {
        return nextResult;
    }

    return {
        format: matchedFormat,
        shortCircuit: true,
        url: nextResult.url,
    }
}

export async function load(url, context, next) {
    const formats = Object.keys(EXTENSIONS);
    if (!formats.includes(context.format)) {
        return next(url, context);
    }

    const rawSource = await fs.readFile(fileURLToPath(url), { encoding: 'utf8' });

    return {
        format: 'module',
        shortCircuit: true,
        source: `const template = ${JSON.stringify(rawSource)};\nexport default template`,
    }
}
