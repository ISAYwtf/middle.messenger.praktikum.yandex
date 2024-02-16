export const joinURL = (
    ...parts: Array<string | number | undefined | null>
): string => {
    const resolvedParts = parts
        .map(String)
        .map((part) => part
            ?.replace(/^\//g, '')
            ?.replace(/\/$/g, '')
            ?.trim())
        .filter(Boolean);

    return resolvedParts.join('/');
};
