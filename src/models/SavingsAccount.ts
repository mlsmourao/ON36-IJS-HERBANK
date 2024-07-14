import { Account } from "./Account";
import { Transaction } from "./Transaction";

export interface SavingsAccountData {
  getInterestRate(): number;
}

export class SavingsAccount extends Account implements SavingsAccountData {
  private _interestRate: number;

  constructor(id: number, accountNumber: string, balance: number, interestRate: number) {
    super(id, accountNumber, balance); 
    this._interestRate = interestRate;
  }

  getInterestRate(): number {
    return this._interestRate;
  }

  deposit(amount: number): void {
    throw new Error("Método deposit não implementado.");
  }

  withdraw(amount: number): void {
    throw new Error("Método withdraw não implementado.");
  }

  getStatement(): Transaction[] {
    throw new Error("Método getStatement não implementado.");
  }

  transfer(amount: number, targetAccount: Account): void {
    throw new Error("Método transfer não implementado.");
  }
}
