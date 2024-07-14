import { Customer } from "./Customer";
import { Credit } from "./Credit";

export interface ManagerData {
  getId(): number;
  getName(): string;
  getCustomers(): Customer[];
}

export class Manager implements ManagerData {
  private id: number;
  private fullName: string;
  private customers: Customer[];

  constructor(id: number, name: string, customers: Customer[]) {
    this.id = id;
    this.fullName = name;
    this.customers = customers;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.fullName;
  }

  getCustomers(): Customer[] {
    return this.customers;
  }
}

export function dailyAccountReport(manager: Manager): void {
  throw new Error("Função dailyAccountReport não implementada.");
}

export function weeklyAccountReport(manager: Manager): void {
  throw new Error("Função weeklyAccountReport não implementada.");
}

export function manageCustomer(manager: Manager, customer: Customer): void {
  throw new Error("Função manageCustomer não implementada.");
}

export function approveCustomerCredit(manager: Manager, credit: Credit): void {
  throw new Error("Função approveCustomerCredit não implementada.");
}

