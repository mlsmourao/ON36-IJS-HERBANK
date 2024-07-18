import { Account } from "./Account";
import { Transaction } from "./Transaction";

export class SavingsAccount extends Account {
  private _interestRate: number;
  private _yieldAmount: number;

  constructor(id: number, accountNumber: string, balance: number, interestRate: number, yieldAmount: number) {
    super(id, accountNumber, balance);
    this._interestRate = interestRate;
    this._yieldAmount = yieldAmount;
  }

  getInterestRate(): number {
    return this._interestRate;
  }

  getYieldAmount(): number {
    return this._yieldAmount;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("O valor do depósito deve ser positivo.");
    }
    this.updateBalance(amount);
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("O valor do saque deve ser positivo.");
    }
    if (amount > this.getBalance()) {
      throw new Error("Saldo insuficiente para saque.");
    }
    this.updateBalance(-amount);
  }

  getStatement(): Transaction[] {
    return this.getTransactions();
  }

  static openAccount(id: number, accountNumber: string, balance: number, interestRate: number, yieldAmount: number): SavingsAccount {
    return new SavingsAccount(id, accountNumber, balance, interestRate, yieldAmount);
  }

}
