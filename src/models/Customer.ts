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
    if (this._manager) {
      console.log(`Adicionando novo cliente: ${this._fullName}`);
      this._manager.manageCustomer(this);
    } else {
      throw new Error("Nenhum gerente associado para adicionar o cliente.");
    }
  }

  updateCustomer(updatedDetails: Partial<{
    fullName: string;
    birthDate: Date;
    cpf: string;
    address: string;
    phoneNumbers: string[];
    email: string;
    creditHistory: Credit[];
    accounts: Account[];
    manager: Manager;
  }>): void {
    console.log(`Atualizando informações do cliente: ${this._fullName}`);

    if (updatedDetails.fullName !== undefined) this._fullName = updatedDetails.fullName;
    if (updatedDetails.birthDate !== undefined) this._birthDate = updatedDetails.birthDate;
    if (updatedDetails.cpf !== undefined) this._cpf = updatedDetails.cpf;
    if (updatedDetails.address !== undefined) this._address = updatedDetails.address;
    if (updatedDetails.phoneNumbers !== undefined) this._phoneNumbers = updatedDetails.phoneNumbers;
    if (updatedDetails.email !== undefined) this._email = updatedDetails.email;
    if (updatedDetails.creditHistory !== undefined) this._creditHistory = updatedDetails.creditHistory;
    if (updatedDetails.accounts !== undefined) this._accounts = updatedDetails.accounts;
    if (updatedDetails.manager !== undefined) this._manager = updatedDetails.manager;
  }
}
