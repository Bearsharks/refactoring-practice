export function band(usage, rangeMn, rangeMx) {
    return Math.max(rangeMn, Math.min(usage, rangeMx)) - rangeMn;
}