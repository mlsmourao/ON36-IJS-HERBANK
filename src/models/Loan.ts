import { Transaction } from "./Transaction";
import { Account } from "./Account";
import { Credit } from "./Credit";

export class Loan extends Credit {
  private _amount: number;
  private _interest: number;
  private _approvalDate: Date;
  private _dueDates: Date[];
  private _installments: number;
  private _status: string;
  private _installmentTransactions: Transaction[];
  private _installmentStatus: string[];

  constructor(
    id: number,
    amount: number,
    interest: number,
    approvalDate: Date,
    dueDates: Date[],
    installments: number,
    status: string,
    account: Account,
    installmentTransactions: Transaction[]
  ) {
    super(id, account);
    this._amount = amount;
    this._interest = interest;
    this._approvalDate = approvalDate;
    this._dueDates = dueDates;
    this._installments = installments;
    this._status = status;
    this._installmentTransactions = installmentTransactions;
    this._installmentStatus = new Array(installments).fill("pending");
  }

  payInstallment(installmentIndex: number, amount: number): void {
    this.validateInstallmentIndex(installmentIndex);
    this.validatePayment(amount);

    if (this._installmentStatus[installmentIndex] === "paid") {
      throw new Error("Esta parcela já foi paga.");
    }

    this._installmentStatus[installmentIndex] = "paid";
    this._amount -= amount;

    console.log(`Pagamento da parcela ${installmentIndex + 1} realizado com sucesso.`);
  }

  payBill(amount: number): void {
    throw new Error("Método não implementado para empréstimo.");
  }

  getRemainingAmount(): number {
    return this._amount - this.checkOutstandingBalance();
  }

  checkOutstandingBalance(): number {
    const totalPaidAmount = this._installmentTransactions
      .filter(transaction => transaction.getStatus() === "paid")
      .reduce((sum, transaction) => sum + transaction.getAmount(), 0);

    return this._amount - totalPaidAmount;
  }

  getInvoice(month: number, year: number): Transaction[] {
    return this._installmentTransactions.filter(transaction =>
      transaction.getDate().getMonth() === month &&
      transaction.getDate().getFullYear() === year
    );
  }

  getCreditHistory(): Transaction[] {
    return this._installmentTransactions;
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

  getAmount(): number {
    return this._amount;
  }

  getInterest(): number {
    return this._interest;
  }

  getApprovalDate(): Date {
    return this._approvalDate;
  }

  getDueDates(): Date[] {
    return this._dueDates;
  }

  getInstallments(): number {
    return this._installments;
  }

  getStatus(): string {
    return this._status;
  }

  private validateInstallmentIndex(index: number): void {
    if (index < 0 || index >= this._installments) {
      throw new Error("Índice de parcela inválido.");
    }
  }

  private validatePayment(amount: number): void {
    if (amount <= 0) {
      throw new Error("Valor inválido para pagamento.");
    }
    if (amount > this.getRemainingAmount()) {
      throw new Error("Valor excede o saldo devedor.");
    }
  }
}
