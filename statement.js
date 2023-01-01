import {PerformanceBill} from "./bills/PerformanceBill.js";
import Invoice from "./invoice/Invoice.js";

export function statement(invoice, plays) {
  const bills = invoice.performances.map(perf =>
      PerformanceBill.factory(plays[perf.playID], perf));
  const myInvoice = new Invoice(invoice.customer, bills);
  return myInvoice.statement();
}

