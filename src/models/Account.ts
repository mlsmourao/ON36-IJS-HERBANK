import { Transaction } from "./Transaction";
import { Credit } from "./Credit";
import { CreditCard } from "./CreditCard";
import { CheckingAccount } from "./CheckingAccount";
import { SavingsAccount } from "./SavingsAccount";

export interface AccountData {
    getId(): number;
    getAccountNumber(): string;
    getBalance(): number;
    getTransactions(): Transaction[];
    getCredits?(): Credit[];
    getCreditCards?(): CreditCard[];
}

export abstract class Account implements AccountData {
    private _id: number;
    private _accountNumber: string;
    private _balance: number;
    private _transactions: Transaction[];
    protected _credits?: Credit[];
    protected _creditCards?: CreditCard[];

    constructor(id: number, accountNumber: string, balance: number) {
        this._id = id;
        this._accountNumber = accountNumber;
        this._balance = balance;
        this._transactions = [];
    }

    getId(): number {
        return this._id;
    }

    getAccountNumber(): string {
        return this._accountNumber;
    }

    getBalance(): number {
        return this._balance;
    }

    getTransactions(): Transaction[] {
        return this._transactions;
    }

    abstract deposit(amount: number): void;
    abstract withdraw(amount: number): void;
    abstract getStatement(): Transaction[];

    transfer(amount: number, targetAccount: Account): void {
        throw new Error("Método transfer não implementado.");
    }

    payBill(amount: number): void {
        throw new Error("Método payBill não implementado.");
    }

    receivePension(amount: number): void {
        throw new Error("Método receivePension não implementado.");
    }

    static openAccount(id: number, accountNumber: string, balance: number, type: string): Account {
        if (type === "Checking Account") {
            return new CheckingAccount(id, accountNumber, balance, 0);
        } else if (type === "Savings Account") {
            return new SavingsAccount(id, accountNumber, balance, 0);
        } else {
            throw new Error("Tipo de conta inválido");
        }
    }
}
