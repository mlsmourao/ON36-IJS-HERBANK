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
    // Implementação será feita posteriormente
  }

  withdraw(amount: number): void {
    // Implementação será feita posteriormente
  }

  getStatement(): Transaction[] {
    // Implementação será feita posteriormente
    return [];
  }

  transfer(amount: number, targetAccount: Account): void {
    // Implementação será feita posteriormente
  }
}
