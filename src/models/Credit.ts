import { Account } from "./Account";

export abstract class Credit {
  protected _id: number;
  protected _account: Account;

  constructor(id: number, account: Account) {
    this._id = id;
    this._account = account;
  }

  abstract payBill(amount: number): void;

  abstract getRemainingAmount(): number;

  abstract checkOutstandingBalance(): void;

  getId(): number {
    return this._id;
  }

  getAccount(): Account {
    return this._account;
  }
}
