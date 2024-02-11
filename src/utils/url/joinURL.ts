export const joinURL = (
    ...parts: Array<string | number | undefined | null>
): string => {
    const resolvedParts = parts
        .filter(Boolean)
        .map((part) => String(part)
            ?.replace(/^\//g, '')
            ?.replace(/\/$/g, '')
            ?.trim())
        .filter(Boolean);

    return resolvedParts.join('/');
};
