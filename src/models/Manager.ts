import { Customer } from "./Customer";
import { Credit } from "./Credit";

export interface Manager {
  id: string;
  name: string;
  customers: Customer[];
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
