import { Transaction } from "./Transaction";
import { Account } from "./Account";

export interface CreditCardData {
  getId(): number;
  getCardNumber(): number;
  getCreditLimit(): number;
  getOutstandingBalance(): number;
  getTransactions(): Transaction[];
  getAccount(): Account;
  getDueDate(): Date;
  getClosingDate(): Date;
}

export class CreditCard implements CreditCardData {
  private _id: number;
  private _cardNumber: number;
  private _creditLimit: number;
  private _outstandingBalance: number;
  private _transactions: Transaction[];
  private _account: Account;
  private _duedate: Date;
  private _closingDate: Date;

  constructor(id: number, cardNumber: number, creditLimit: number, account: Account, duedate: Date, closingDate: Date) {
    this._id = id;
    this._cardNumber = cardNumber;
    this._creditLimit = creditLimit;
    this._outstandingBalance = 0; 
    this._transactions = [];
    this._account = account;
    this._duedate = duedate;
    this._closingDate = closingDate;
  }

  getId(): number {
    return this._id;
  }

  getCardNumber(): number {
    return this._cardNumber;
  }

  getCreditLimit(): number {
    return this._creditLimit;
  }

  getOutstandingBalance(): number {
    return this._outstandingBalance;
  }

  getTransactions(): Transaction[] {
    return this._transactions;
  }

  getAccount(): Account {
    return this._account;
  }

  getDueDate(): Date {
    return this._duedate;
  }
  getClosingDate(): Date {
    return this._closingDate
  }

  issueCard(): void {
    // Implementação será feita posteriormente
  }

  checkOutstandingBalance(): number {
    // Implementação será feita posteriormente
    return this._outstandingBalance;
  }

  payBill(): void {
    // Implementação será feita posteriormente
  }
}
