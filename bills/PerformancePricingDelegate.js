import {band, format} from "../util.js";

export class TragedyPerformancePricingDelegate {
    #cost;
    #credits;

    constructor(numOfAudience) {
        this.#cost = 40000 + band(numOfAudience, 30, Infinity) * 1000;
        this.#credits = Math.max(numOfAudience - 30, 0);
    }

    get cost() {
        return this.#cost;
    }

    get credits() {
        return this.#credits;
    }
}


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
        // TODO 생성시 초기화
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

    get credits() {
        let volumeCredits = 0;
        volumeCredits += Math.max(this.audience - 30, 0);
        if ('comedy' === this.#play.type) volumeCredits += Math.floor(this.audience / 5);
        return volumeCredits;
    }
}

