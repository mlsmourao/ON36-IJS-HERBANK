import { Account } from "./Account";
import { Manager } from "./Manager";
import { Credit } from "./Credit";

export interface CustomerData {
  getId(): number;
  getName(): string;
  getBirthDate(): Date;
  getCpf(): string;
  getAddress(): string;
  getPhoneNumbers(): string[];
  getEmail(): string;
  getCreditHistory(): Credit[];
  getAccounts(): Account[];
  getManager(): Manager;
}

export class Customer implements CustomerData {
  private _id: number;
  private _name: string;
  private _birthDate: Date;
  private _cpf: string;
  private _address: string;
  private _phoneNumbers: string[];
  private _email: string;
  private _creditHistory: Credit[];
  private _accounts: Account[];
  private _manager: Manager;

  constructor(
    id: number,
    name: string,
    birthDate: Date,
    cpf: string,
    address: string,
    phoneNumbers: string[],
    email: string,
    manager: Manager
  ) {
    this._id = id;
    this._name = name;
    this._birthDate = birthDate;
    this._cpf = cpf;
    this._address = address;
    this._phoneNumbers = phoneNumbers;
    this._email = email;
    this._creditHistory = [];
    this._accounts = [];
    this._manager = manager;
  }

  getId(): number {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getBirthDate(): Date {
    return this._birthDate;
  }

  getCpf(): string {
    return this._cpf;
  }

  getAddress(): string {
    return this._address;
  }

  getPhoneNumbers(): string[] {
    return this._phoneNumbers;
  }

  getEmail(): string {
    return this._email;
  }

  getCreditHistory(): Credit[] {
    return this._creditHistory;
  }

  getAccounts(): Account[] {
    return this._accounts;
  }

  getManager(): Manager {
    return this._manager;
  }

  newCustomer(): void {
    // Implementação será feita posteriormente
  }

  updateCustomer(): void {
    // Implementação será feita posteriormente
  }

  getCreditHistoryMethod(): Credit[] {
    return this._creditHistory;
  }
}
