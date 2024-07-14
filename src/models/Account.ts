import { Transaction } from "./Transaction";
import { Credit } from "./Credit";
import { CreditCard } from "./CreditCard";
import { Customer } from "./Customer";

export abstract class Account {
    id: string;
    accountType: string;
    accountNumber: string;
    balance: number;
    transactions: Transaction[];
    credits?: Credit[];
    creditCards?: CreditCard[];

    constructor(id: string, accountType: string, accountNumber: string, balance: number) {
        this.id = id;
        this.accountType = accountType;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.transactions = [];
        this.credits = [];
        this.creditCards = [];
    }

    abstract deposit(amount: number): void;
    abstract withdraw(amount: number): void;
    abstract getStatement(): Transaction[];

    transfer(amount: number, targetAccount: Account): void {
        // Implementação será feita posteriormente
    }
}

export class CheckingAccount extends Account {
    overdraftLimit: number;

    constructor(id: string, accountNumber: string, balance: number, overdraftLimit: number) {
        super(id, "Checking Account", accountNumber, balance);
        this.overdraftLimit = overdraftLimit;
    }

    deposit(amount: number): void {
        // Implementação será feita posteriormente
    }

    withdraw(amount: number): void {
        // Implementação será feita posteriormente
    }

    getStatement(): Transaction[] {
        // Implementação será feita posteriormente
        return [];
    }

    transfer(amount: number, targetAccount: Account): void {
        // Implementação será feita posteriormente
    }
}

export class SavingsAccount extends Account {
    interestRate: number;

    constructor(id: string, accountNumber: string, balance: number, interestRate: number) {
        super(id, "Savings Account", accountNumber, balance);
        this.interestRate = interestRate;
    }

    deposit(amount: number): void {
        // Implementação será feita posteriormente
    }

    withdraw(amount: number): void {
        // Implementação será feita posteriormente
    }

    getStatement(): Transaction[] {
        // Implementação será feita posteriormente
        return [];
    }

    transfer(amount: number, targetAccount: Account): void {
        // Implementação será feita posteriormente
    }
}

export function openAccount(customer: Customer, type: string, initialBalance: number): Account {
    // Implementação será feita posteriormente
    return {} as Account;
}
