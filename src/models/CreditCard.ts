import { Transaction } from "./Transaction";
import { Account } from "./Account";
import { Credit } from "./Credit";

export class CreditCard extends Credit {
  private _cardNumber: number;
  private _securityCode: string;
  private _cardExpiration: Date;
  private _creditLimit: number;
  private _outstandingBalance: number;
  private _transactions: Transaction[];
  private _duedates: Date[];
  private _closingDates: Date[];

  constructor(
    id: number,
    cardNumber: number,
    securityCode: string,
    cardExpiration: Date,
    creditLimit: number,
    account: Account,
    duedates: Date[],
    closingDates: Date[]
  ) {
    super(id, account);
    this._cardNumber = cardNumber;
    this._securityCode = securityCode;
    this._cardExpiration = cardExpiration;
    this._creditLimit = creditLimit;
    this._outstandingBalance = 0;
    this._transactions = [];
    this._duedates = duedates;
    this._closingDates = closingDates;
  }

  getCardNumber(): number {
    return this._cardNumber;
  }

  getSecurityCode(): string {
    return this._securityCode;
  }

  getCardExpiration(): Date {
    return this._cardExpiration;
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

  getDueDates(): Date[] {
    return this._duedates;
  }

  getClosingDates(): Date[] {
    return this._closingDates;
  }

  checkOutstandingBalance(): number {
    return this._transactions.reduce((total, transaction) => total + transaction.getAmount(), this._outstandingBalance);
  }

  payBill(amount: number): void {
    this.validatePositiveAmount(amount);
    if (amount > this._outstandingBalance) {
      throw new Error("Valor excede o saldo devedor.");
    }

    console.log(`Pagamento de R$ ${amount.toFixed(2)} realizado com sucesso.`);
    this._outstandingBalance -= amount;
  }

  getRemainingAmount(): number {
    return this._creditLimit - this._outstandingBalance;
  }

  getInvoice(month: number, year: number): Transaction[] {
    const invoiceTransactions: Transaction[] = [];
    const closingDate = this._closingDates.find(date => date.getMonth() === month && date.getFullYear() === year);

    if (closingDate) {
      this._transactions.forEach(transaction => {
        if (transaction.getDate().getMonth() === month && transaction.getDate().getFullYear() === year) {
          invoiceTransactions.push(transaction);
        }
      });
    }

    return invoiceTransactions;
  }

  getCardHistory(): Transaction[] {
    return this._transactions;
  }

  private validatePositiveAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error("Valor inválido.");
    }
  }
}
