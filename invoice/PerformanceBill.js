import {band} from "../util.js";

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

    get bookingCost() {
        if (this.#play.type === 'tragedy') {
            return 40000 + band(this.#performance.audience, 30, Infinity) * 1000
        }
        if (this.#play.type === 'comedy') {
            const basePrice = 30000 + (300 * this.#performance.audience);
            if (this.#performance.audience > 20) {
                const additionalCost = 10000 + 500 * band(this.#performance.audience, 20, Infinity);
                return basePrice + additionalCost;
            }
            return basePrice;
        }
        throw new Error(`알 수 없는 장르: ${this.#play.type}`);
    }
}