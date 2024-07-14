import { Transaction } from "./Transaction";
import { Account } from "./Account";
import { Customer } from "./Customer";

export interface Credit {
  id: string;
  type: string;
  amount: number;
  interest: number;
  status: string;
  approvalDate: Date;
  dueDate: Date;
  transactions: Transaction[];
  account: Account;
}

export function requestCredit(customer: Customer, type: string, amount: number): Credit {
  // Implementar lógica para iniciar solicitação de crédito
  return {} as Credit;
}

export function approveCredit(credit: Credit): void {
  // Implementar lógica para aprovar crédito
}

export function checkStatus(credit: Credit): string {
  // Implementar lógica para verificar status da solicitação de crédito
  return credit.status;
}
