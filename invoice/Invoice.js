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

    htmlStatement() {
        let result = `<h1>청구 내역 (고객명: ${this.#customerName})</h1>\n`;
        result += `<table>\n`;
        result += `<tr><th>play</th><th>석</th><th>cost</th></tr>\n`;
        this.#bills.forEach(bill => {
            result += bill.printHTMLDetails();
        });
        result += `</table>\n`;
        result += `<p>총액: <em>${format(this.totalAmount / 100)}</em></p>\n`;
        result += `<p>적립 포인트: <em>${this.volumeCredits}</em>점</p>\n`;
        return result;
    }

}