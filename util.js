export function band(usage, rangeMn, rangeMx) {
    return Math.max(rangeMn, Math.min(usage, rangeMx)) - rangeMn;
}


export const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
}).format;