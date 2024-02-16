export const resolvePath = (path: string) => path.startsWith('/') ? path : `/${path}`;
