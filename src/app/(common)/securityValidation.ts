export const sanitizeText = (value: string): string => {
    return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
};

export const encodeRouteSegment = (value: string, maxLength = 200): string => {
    const safeValue = sanitizeText(value).slice(0, maxLength);
    return encodeURIComponent(safeValue);
};

export const isValidListItem = (value: string): boolean => {
    const safe = sanitizeText(value);
    if (!safe || safe.length > 120) {
        return false;
    }
    return /^[\p{L}\p{N}\s\-_'().,]+$/u.test(safe);
};
