import { lstatSync } from 'fs'
import { join, parse } from 'path'
import { getFormat, load, resolve as resolveTs, transformSource } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths'

export { getFormat, transformSource, load };

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve(specifier, context, defaultResolver) {
    const mappedSpecifier = matchPath(specifier)
    if (mappedSpecifier) {
        try {
            const directory = lstatSync(mappedSpecifier).isDirectory()
            const withExtension = Boolean(parse(mappedSpecifier));
            specifier = join(
                'file://',
                mappedSpecifier,
                directory ? 'index.ts' : withExtension
                    ? ''
                    : '.ts'
            )
        } catch {
            specifier = `${mappedSpecifier}.js`
        }
      }

    return resolveTs(specifier, context, defaultResolver);
}
