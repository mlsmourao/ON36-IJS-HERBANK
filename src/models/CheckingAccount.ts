import { Account } from "./Account";
import { Transaction } from "./Transaction";

export class CheckingAccount extends Account {
  private _overdraftLimit: number;

  constructor(id: number, accountNumber: string, balance: number, overdraftLimit: number) {
    super(id, accountNumber, balance);
    this._overdraftLimit = overdraftLimit;
  }

  getOverdraftLimit(): number {
    return this._overdraftLimit;
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
    if (amount > this.getBalance() + this._overdraftLimit) {
      throw new Error("Saldo e limite de cheque especial insuficientes para saque.");
    }
    this.updateBalance(-amount);
  }

  getStatement(): Transaction[] {
    return this.getTransactions();
  }

  transfer(amount: number, targetAccount: Account, transaction: Transaction): void {
    if (amount <= 0) {
      throw new Error("O valor da transferência deve ser positivo.");
    }
    if (amount > this.getBalance() + this._overdraftLimit) {
      throw new Error("Saldo e limite de cheque especial insuficientes para transferência.");
    }
    this.withdraw(amount);
    targetAccount.deposit(amount);
    this.addTransaction(transaction);
  }
}
