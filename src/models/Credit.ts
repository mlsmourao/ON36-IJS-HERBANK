import { Transaction } from "./Transaction";
import { Account } from "./Account";

export interface CreditData {
  getId(): number;
  getAmount(): number;
  getInterest(): number;
  getApprovalDate(): Date;
  getDueDate(): Date;
  getTransactions(): Transaction[];
  getStatus(): string;
  getAccount(): Account;
  getInstallments(): number;
  getRemainingAmount(): number;
}

export class Credit implements CreditData {
  private _id: number;
  private _amount: number;
  private _interest: number;
  private _approvalDate: Date;
  private _dueDate: Date;
  private _transactions: Transaction[];
  private _status: string;
  private _account: Account;
  private _installments: number;
  private _remainingAmount: number;

  constructor(
    id: number,
    amount: number,
    interest: number,
    approvalDate: Date,
    dueDate: Date,
    account: Account,
    installments: number
  ) {
    this._id = id;
    this._amount = amount;
    this._interest = interest;
    this._approvalDate = approvalDate;
    this._dueDate = dueDate;
    this._transactions = [];
    this._status = "pending"; 
    this._account = account;
    this._installments = installments;
    this._remainingAmount = amount; 
  }

  getId(): number {
    return this._id;
  }

  getAmount(): number {
    return this._amount;
  }

  getInterest(): number {
    return this._interest;
  }

  getApprovalDate(): Date {
    return this._approvalDate;
  }

  getDueDate(): Date {
    return this._dueDate;
  }

  getTransactions(): Transaction[] {
    return this._transactions;
  }

  getStatus(): string {
    return this._status;
  }

  getAccount(): Account {
    return this._account;
  }

  getInstallments(): number {
    return this._installments;
  }

  getRemainingAmount(): number {
    return this._remainingAmount;
  }


  requestCredit(): void {
    throw new Error("Método requestCredit não implementado.");
  }

  approveCredit(): void {
    throw new Error("Método approveCredit não implementado.");
  }

  checkStatus(): string {
    throw new Error("Método checkStatus não implementado.");
  }
}
