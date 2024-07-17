import { Transaction } from "./Transaction";
import { Account } from "./Account";

export class Loan {
  private _id: number;
  private _amount: number;
  private _interest: number;
  private _approvalDate: Date;
  private _dueDate: Date;
  private _installments: number;
  private _status: string;

  constructor(
    id: number,
    amount: number,
    interest: number,
    approvalDate: Date,
    dueDate: Date,
    installments: number,
    status: string
  ) {
    this._id = id;
    this._amount = amount;
    this._interest = interest;
    this._approvalDate = approvalDate;
    this._dueDate = dueDate;
    this._installments = installments;
    this._status = status;
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

  getInstallments(): number {
    return this._installments;
  }

  getStatus(): string {
    return this._status;
  }

  requestCredit(): void {
    console.log("Solicitação de crédito realizada.");
  }

  approveCredit(): void {
    console.log("Crédito aprovado.");
  }

  checkStatus(): string {
    return this._status;
  }
}
