import {PerformanceBill} from "./bills/PerformanceBill.js";
import Invoice from "./invoice/Invoice.js";

export function simpleStatement(invoice, plays) {
  const bills = invoice.performances.map(perf =>
      PerformanceBill.factory(plays[perf.playID], perf));
  const myInvoice = new Invoice(invoice.customer, bills);
  return myInvoice.simpleStatement();
}

export function htmlStatement(invoice, plays) {
  const bills = invoice.performances.map(perf =>
      PerformanceBill.factory(plays[perf.playID], perf));
  const myInvoice = new Invoice(invoice.customer, bills);
  return myInvoice.htmlStatement();
}


