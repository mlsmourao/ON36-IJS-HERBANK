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
