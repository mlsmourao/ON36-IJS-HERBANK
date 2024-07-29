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
    this.validatePositiveAmount(amount, "depósito");
    this.updateBalance(amount);
  }

  withdraw(amount: number): void {
    this.validatePositiveAmount(amount, "saque");
    this.checkSufficientFunds(amount);
    this.updateBalance(-amount);
  }

  getStatement(): Transaction[] {
    return this.getTransactions();
  }

  transfer(amount: number, targetAccount: Account, transaction: Transaction): void {
    this.validatePositiveAmount(amount, "transferência");
    this.checkSufficientFunds(amount);
    this.withdraw(amount);
    targetAccount.deposit(amount);
    this.addTransaction(transaction);
  }

  private validatePositiveAmount(amount: number, type: string): void {
    if (amount <= 0) {
      throw new Error(`O valor do ${type} deve ser positivo.`);
    }
  }

  private checkSufficientFunds(amount: number): void {
    if (amount > this.getBalance() + this._overdraftLimit) {
      throw new Error("Saldo e limite de cheque especial insuficientes.");
    }
  }
}
