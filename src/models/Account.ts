import { Transaction } from "./Transaction";

export abstract class Account {
  private _id: number;
  private _accountNumber: string;
  protected _balance: number;
  private _transactions: Transaction[];

  constructor(id: number, accountNumber: string, balance: number) {
    this._id = id;
    this._accountNumber = accountNumber;
    this._balance = balance;
    this._transactions = [];
  }

  getId(): number {
    return this._id;
  }

  getAccountNumber(): string {
    return this._accountNumber;
  }

  getBalance(): number {
    return this._balance;
  }

  getTransactions(): Transaction[] {
    return this._transactions;
  }

  protected addTransaction(transaction: Transaction): void {
    this._transactions.push(transaction);
  }

  protected updateBalance(amount: number): void {
    this._balance += amount;
  }

  private validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error("O valor deve ser positivo.");
    }
  }

  private checkSufficientBalance(amount: number): void {
    if (amount > this._balance) {
      throw new Error("Saldo insuficiente.");
    }
  }

  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
  abstract getStatement(): Transaction[];

  transfer(amount: number, targetAccount: Account, transaction: Transaction): void {
    this.validateAmount(amount);
    this.checkSufficientBalance(amount);
    this.withdraw(amount);
    targetAccount.deposit(amount);
    this.addTransaction(transaction);
  }

  payBill(amount: number, transaction: Transaction): void {
    this.validateAmount(amount);
    this.checkSufficientBalance(amount);
    this.withdraw(amount);
    this.addTransaction(transaction);
  }

  receivePension(amount: number, transaction: Transaction): void {
    this.validateAmount(amount);
    this.deposit(amount);
    this.addTransaction(transaction);
  }

  checkTransaction(transactionId: string): Transaction | undefined {
    return this._transactions.find(transaction => transaction.getId() === transactionId);
  }
}
