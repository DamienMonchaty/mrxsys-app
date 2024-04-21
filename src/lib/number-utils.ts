export const parseNumber = (value: string | number): number | null => {
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    } else if (typeof value === 'number') {
        return value;
    }
    return null;
};

export const isNumber = (value: string | number): boolean => {
    return parseNumber(value) !== null;
};