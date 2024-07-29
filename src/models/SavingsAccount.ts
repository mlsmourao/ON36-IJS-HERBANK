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
    this.validatePositiveAmount(amount, 'depósito');
    this.updateBalance(amount);
  }

  withdraw(amount: number): void {
    this.validatePositiveAmount(amount, 'saque');
    if (amount > this.getBalance()) {
      throw new Error("Saldo insuficiente para saque.");
    }
    this.updateBalance(-amount);
  }

  private validatePositiveAmount(amount: number, operation: string): void {
    if (amount <= 0) {
      throw new Error(`O valor do ${operation} deve ser positivo.`);
    }
  }

  getStatement(): Transaction[] {
    return this.getTransactions();
  }

  static openAccount(id: number, accountNumber: string, balance: number, interestRate: number, yieldAmount: number): SavingsAccount {
    return new SavingsAccount(id, accountNumber, balance, interestRate, yieldAmount);
  }
}
