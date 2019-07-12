export function isDigit(str) {
    return (/^\d+$/.test(str));
}

export function capitalize(s) {
    return s.split(' ').map((raw) => raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()).join(' ');
}