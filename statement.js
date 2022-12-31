function band(usage, rangeMn, rangeMx) {
  return Math.max(rangeMn, Math.min(usage, rangeMx)) - rangeMn;
}

function calcTragedyBookingCost(numOfAudience) {
  return 40000 + band(numOfAudience, 30, Infinity) * 1000;
}

function calcComedyBookingCost(numOfAudience) {
  const basePrice = 30000 + (300 * numOfAudience);
  if (numOfAudience > 20) {
    const additionalCost = 10000 + 500 * band(numOfAudience, 20, Infinity);
    return basePrice + additionalCost;
  }
  return basePrice;
}

export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy': // 비극
        thisAmount = calcTragedyBookingCost(perf.audience);
        break;
      case 'comedy': // 희극
        thisAmount = calcComedyBookingCost(perf.audience);
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `  ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

