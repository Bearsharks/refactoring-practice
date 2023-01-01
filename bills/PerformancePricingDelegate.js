import {band, format} from "../util.js";

export class PerformancePricingDelegate {
    #play;
    #performance;

    constructor(play, performance) {
        this.#play = play;
        this.#performance = performance;
    }
    get audience() {
        return this.#performance.audience;
    }

    get cost() {
        if (this.#play.type === 'tragedy') {
            return 40000 + band(this.audience, 30, Infinity) * 1000
        }

        if (this.#play.type === 'comedy') {
            const basePrice = 30000 + (300 * this.audience);
            if (this.audience > 20) {
                const additionalCost = 10000 + 500 * band(this.audience, 20, Infinity);
                return basePrice + additionalCost;
            }
            return basePrice;
        }
        throw new Error(`알 수 없는 장르: ${this.#play.type}`);
    }
}