import {format} from "../util.js";
import {
    ComedyPerformancePricingDelegate,
    TragedyPerformancePricingDelegate
} from "./PerformancePricingDelegate.js";

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
    #pricingDelegate;
    static factory(play, performance) {
        const newBill = new PerformanceBill(play, performance);
        switch (play.type) {
            case 'tragedy' :
                newBill.#pricingDelegate = new TragedyPerformancePricingDelegate(performance.audience);
                break;
            case 'comedy' :
                newBill.#pricingDelegate = new ComedyPerformancePricingDelegate(performance.audience);
                break;
            default :
                throw new Error(`알 수 없는 장르: ${this.#play.type}`);
        }

        return newBill;
    }
    constructor(play, performance, pricingDelegate) {
        this.#play = play;
        this.#performance = performance;
        this.#pricingDelegate = pricingDelegate;
    }

    get cost() {
        return this.#pricingDelegate.cost;
    }

    get credits() {
        return this.#pricingDelegate.credits;
    }

    printDetails() {
        return `  ${this.#play.name}: ${format(this.cost / 100)} (${this.#performance.audience}석)\n`
    }
}