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

  issueCard(): CreditCard {
    return new CreditCard(
      this.getId(),
      this._cardNumber,
      this._securityCode,
      this._cardExpiration,
      this._creditLimit,
      this.getAccount(),
      this._duedates,
      this._closingDates
    );
  }

  checkOutstandingBalance(): number {
    let totalBalance = this._outstandingBalance;
    for (const transaction of this._transactions) {
      totalBalance += transaction.getAmount();
    }
    return totalBalance;
  }

  payBill(amount: number): void {
    if (amount <= 0) {
      throw new Error("Valor inválido para pagamento.");
    }
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
    for (let i = 0; i < this._closingDates.length; i++) {
      const closingDate = this._closingDates[i];
      if (closingDate.getMonth() === month && closingDate.getFullYear() === year) {
        for (const transaction of this._transactions) {
          if (transaction.getDate().getMonth() === month && transaction.getDate().getFullYear() === year) {
            invoiceTransactions.push(transaction);
          }
        }
        break;
      }
    }
    return invoiceTransactions;
  }

  getCardHistory(): Transaction[] {
    return this._transactions;
  }
}
