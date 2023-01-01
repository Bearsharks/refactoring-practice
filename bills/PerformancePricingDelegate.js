import {band} from "../util.js";

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


export class ComedyPerformancePricingDelegate {
    #cost;
    #credits;
    constructor(numOfAudience) {
        this.#cost = this.calcCost(numOfAudience);
        this.#credits = Math.max(numOfAudience - 30, 0) + Math.floor(numOfAudience / 5);
    }
    calcCost(numOfAudience) {
        const basePrice = 30000 + (300 * numOfAudience);
        if (numOfAudience > 20) {
            const additionalCost = 10000 + 500 * band(numOfAudience, 20, Infinity);
            return basePrice + additionalCost;
        }
        return basePrice;
    }

    get cost() {
        return this.#cost;
    }

    get credits() {
        return this.#credits;
    }
}

