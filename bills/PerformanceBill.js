import {band, format} from "../util.js";

export class Play {
    #id;
    #name;
    #type;
    constructor(id, name, type) {
        this.#id = id;
        this.#name = name;
        this.#type = type;
    }
}

export class Performance {
    #playID;
    #audience;
    constructor(playId, audience) {
        this.#playID = playId;
        this.#audience = audience;
    }
}

export class PerformanceBill {
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

    get credits() {
        let volumeCredits = 0;
        volumeCredits += Math.max(this.audience - 30, 0);
        if ('comedy' === this.#play.type) volumeCredits += Math.floor(this.audience / 5);
        return volumeCredits;
    }

    printDetails() {
        return `  ${this.#play.name}: ${format(price / 100)} (${numOfAudience}석)\n`
    }
}