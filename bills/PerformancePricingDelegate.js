import {band} from "../util.js";

class PerformancePricingDelegate {
    #cost;
    #credits;
    constructor(numOfAudience) {
        this.#cost = this._calcCost(numOfAudience);
        this.#credits = this._calcCredits(numOfAudience);
    }

    _calcCost(numOfAudience) {
        throw new Error(`추상메소드 calcCost() 를 재정의 하지 않고 사용함`);
        return numOfAudience;
    }

    _calcCredits(numOfAudience) {
        return Math.max(numOfAudience - 30, 0);
    }

    get cost() {
        return this.#cost;
    }

    get credits() {
        return this.#credits;
    }
}

export class TragedyPerformancePricingDelegate extends PerformancePricingDelegate{
    constructor(numOfAudience) {
        super(numOfAudience);
    }

    _calcCost(numOfAudience) {
        return 40000 + band(numOfAudience, 30, Infinity) * 1000;
    }
}


export class ComedyPerformancePricingDelegate extends PerformancePricingDelegate{
    constructor(numOfAudience) {
        super(numOfAudience);
    }

    _calcCost(numOfAudience) {
        const basePrice = 30000 + (300 * numOfAudience);
        if (numOfAudience > 20) {
            const additionalCost = 10000 + 500 * band(numOfAudience, 20, Infinity);
            return basePrice + additionalCost;
        }
        return basePrice;
    }

    _calcCredits(numOfAudience) {
        return super._calcCredits(numOfAudience) + Math.floor(numOfAudience / 5);
    }
}

