export function isDigit(str: string) {
    return (/^\d+$/.test(str));
}

export function capitalize(s: string) {
    return s.split(' ').map((raw) => raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()).join(' ');
}