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
  private _installmentStatus: string[]; // Array para armazenar o status de cada parcela

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
    this._installmentStatus = new Array(installments).fill("pending"); // Inicializa todos as parcelas como pendentes
  }

  // Método para realizar o pagamento de uma parcela específica
  payInstallment(installmentIndex: number, amount: number): void {
    if (installmentIndex < 0 || installmentIndex >= this._installments) {
      throw new Error("Índice de parcela inválido.");
    }

    if (this._installmentStatus[installmentIndex] === "paid") {
      throw new Error("Esta parcela já foi paga.");
    }

    // Lógica para verificar e aplicar o pagamento da parcela
    if (amount <= 0) {
      throw new Error("Valor inválido para pagamento.");
    }
    if (amount > this.getRemainingAmount()) {
      throw new Error("Valor excede o saldo devedor.");
    }

    // Considerando que o pagamento está correto, atualiza o status da parcela e o saldo devedor
    this._installmentStatus[installmentIndex] = "paid";
    this._amount -= amount; // Abate o valor do saldo devedor

    console.log(`Pagamento da parcela ${installmentIndex + 1} realizado com sucesso.`);
  }

  // Implementação dos métodos abstratos da classe Credit
  payBill(amount: number): void {
    throw new Error("Método não implementado para empréstimo.");
  }

  getRemainingAmount(): number {
    return this._amount - this.checkOutstandingBalance();
  }

  checkOutstandingBalance(): number {
    let totalPaidAmount = 0;
    for (const transaction of this._installmentTransactions) {
      if (transaction.getStatus() === "paid") {
        totalPaidAmount += transaction.getAmount();
      }
    }
    return this._amount - totalPaidAmount;
  }

  getInvoice(month: number, year: number): Transaction[] {
    const invoiceTransactions: Transaction[] = [];
    for (const transaction of this._installmentTransactions) {
      if (
        transaction.getDate().getMonth() === month &&
        transaction.getDate().getFullYear() === year
      ) {
        invoiceTransactions.push(transaction);
      }
    }
    return invoiceTransactions;
  }

  getCardHistory(): Transaction[] {
    return this._installmentTransactions;
  }

  // Métodos adicionais para gerenciar o empréstimo
  requestCredit(): void {
    console.log("Solicitação de crédito realizada.");
  }

  approveCredit(): void {
    console.log("Crédito aprovado.");
  }

  checkStatus(): string {
    return this._status;
  }

  // Getters para os atributos da classe Loan
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
}
