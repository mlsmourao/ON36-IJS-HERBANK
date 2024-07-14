import { Transaction } from "./Transaction";
import { Customer } from "./Customer";
import { Account } from "./Account";

export interface CreditCard {
  id: string;
  cardNumber: string;
  creditLimit: number;
  outstandingBalance: number;
  transactions: Transaction[];
  account: Account;
}

export function issueCard(customer: Customer): CreditCard {
  // Implementar lógica para emitir um novo cartão de crédito
  return {} as CreditCard;
}

export function checkOutstandingBalance(creditCard: CreditCard): number {
  // Implementar lógica para verificar saldo devedor do cartão de crédito
  return creditCard.outstandingBalance;
}

export function payBillCreditCard(creditCard: CreditCard, amount: number): void {
  // Implementar lógica para pagar a fatura do cartão de crédito
}
