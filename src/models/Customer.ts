import { Account } from "./Account";
import { Manager } from "./Manager";
import { Credit } from "./Credit";

export interface Customer {
  id: string;
  name: string;
  age: number;
  birthDate: Date;
  cpf: string;
  address: string;
  phoneNumber: string[];
  email: string;
  creditHistory: Credit[];
  accounts: Account[];
  manager: Manager;
}

export function newCustomer(): Customer {
  // Implementar lógica para registrar um novo cliente
  return {} as Customer;
}

export function updateCustomer(customer: Customer): void {
  // Implementar lógica para atualizar informações do cliente
}

export function getCreditHistory(customer: Customer): Credit[] {
  // Implementar lógica para retornar histórico de créditos do cliente
  return customer.creditHistory;
}
