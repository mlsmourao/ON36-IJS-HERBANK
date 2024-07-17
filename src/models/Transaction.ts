export class Transaction {
  private id: string;
  private type: string;
  private amount: number;
  private date: Date;
  private status: string;

  constructor(id: string, type: string, amount: number, date: Date = new Date(), status: string) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.date = date;
    this.status = status;
  }

  getId(): string {
    return this.id;
  }

  getType(): string {
    return this.type;
  }

  getAmount(): number {
    return this.amount;
  }

  getDate(): Date {
    return this.date;
  }

  getStatus(): string {
    return this.status;
  }

  getTransactionData(): {
    id: string;
    type: string;
    amount: number;
    date: Date;
    status: string;
  } {
    return {
      id: this.id,
      type: this.type,
      amount: this.amount,
      date: this.date,
      status: this.status
    };
  }
}
