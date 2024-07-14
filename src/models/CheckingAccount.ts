import { Account } from "./Account";
import { Transaction } from "./Transaction";

export interface CheckingAccountData {
  getOverdraftLimit(): number;
}

export class CheckingAccount extends Account implements CheckingAccountData {
  private _overdraftLimit: number;

  constructor(id: number, accountNumber: string, balance: number, overdraftLimit: number) {
    super(id, accountNumber, balance); 
    this._overdraftLimit = overdraftLimit;
  }

  getOverdraftLimit(): number {
    return this._overdraftLimit;
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
