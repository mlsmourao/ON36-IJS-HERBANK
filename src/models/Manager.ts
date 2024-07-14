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
  // Implementar lógica para gerar relatório diário das contas
}

export function weeklyAccountReport(manager: Manager): void {
  // Implementar lógica para gerar relatório semanal das contas
}

export function manageCustomer(manager: Manager, customer: Customer): void {
  // Implementar lógica para gerenciar um cliente específico
}

export function approveCustomerCredit(manager: Manager, credit: Credit): void {
  // Implementar lógica para aprovar crédito de um cliente
}
