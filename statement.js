import {PerformanceBill} from "./bills/PerformanceBill.js";
import {format} from "./util.js";

export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    const performanceBill = new PerformanceBill(play, perf);
    // 공연 별 금액 계산
    thisAmount = performanceBill.cost;
    totalAmount += thisAmount;

    // 포인트를 적립한다.
    volumeCredits += performanceBill.credits;

    // 청구 내역을 출력한다.
    result += performanceBill.printDetails();
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

