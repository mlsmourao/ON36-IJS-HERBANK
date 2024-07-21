import { Account } from "./Account";
import { Manager } from "./Manager";
import { Credit } from "./Credit";

export class Customer {
  private _id: number;
  private _fullName: string;
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
    fullName: string,
    birthDate: Date,
    cpf: string,
    address: string,
    phoneNumbers: string[],
    email: string,
    manager: Manager
  ) {
    this._id = id;
    this._fullName = fullName;
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
    return this._fullName;
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
    console.log(`Adicionando novo cliente: ${this._fullName}`);
    this._manager.getCustomers().push(this);
  }

  // updateCustomer(updatedDetails: Partial<Customer>): void {
  //   console.log(`Atualizando informações do cliente: ${this._fullName}`);
  //   if (updatedDetails.getName !== undefined) this._fullName = updatedDetails.getName();
  //   if (updatedDetails.getBirthDate !== undefined) this._birthDate = updatedDetails.getBirthDate();
  //   if (updatedDetails.getCpf !== undefined) this._cpf = updatedDetails.getCpf();
  //   if (updatedDetails.getAddress !== undefined) this._address = updatedDetails.getAddress();
  //   if (updatedDetails.getPhoneNumbers !== undefined) this._phoneNumbers = updatedDetails.getPhoneNumbers();
  //   if (updatedDetails.getEmail !== undefined) this._email = updatedDetails.getEmail();
  //   if (updatedDetails.getCreditHistory !== undefined) this._creditHistory = updatedDetails.getCreditHistory();
  //   if (updatedDetails.getAccounts !== undefined) this._accounts = updatedDetails.getAccounts();
  //   if (updatedDetails.getManager !== undefined) this._manager = updatedDetails.getManager();
  // }

  getCreditHistoryMethod(): Credit[] {
    return this._creditHistory;
  }
}


