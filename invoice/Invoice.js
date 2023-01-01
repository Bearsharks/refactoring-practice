import {format} from "../util.js";

export default class Invoice {
    #bills;
    #customerName;
    constructor(customerName, bills) {
        this.#customerName = customerName;
        this.#bills = bills;
    }

    get totalAmount() {
        return this.#bills.reduce((prevValue, bill) => bill.cost + prevValue, 0);
    }

    get volumeCredits() {
        return this.#bills.reduce((prevValue, bill) => bill.credits + prevValue, 0);
    }

    simpleStatement() {
        let result = `청구 내역 (고객명: ${this.#customerName})\n`;
        this.#bills.forEach(bill => {
            result += bill.printSimpleDetails();
        });
        result += `총액: ${format(this.totalAmount / 100)}\n`;
        result += `적립 포인트: ${this.volumeCredits}점\n`;
        return result;
    }
}