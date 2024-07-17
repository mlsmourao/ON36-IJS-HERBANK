import { Customer } from "./Customer";
import { Credit } from "./Credit";

export class Manager {
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

  dailyAccountReport(): void {
    console.log("Relatório diário das contas:");
    this.customers.forEach(customer => {
      console.log(`Cliente: ${customer.getName()}`);
      customer.getAccounts().forEach(account => {
        console.log(`Conta: ${account.getAccountNumber()}, Saldo: ${account.getBalance()}`);
      });
    });
  }

  weeklyAccountReport(): void {
    console.log("Relatório semanal das contas:");
    this.customers.forEach(customer => {
      console.log(`Cliente: ${customer.getName()}`);
      customer.getAccounts().forEach(account => {
        console.log(`Conta: ${account.getAccountNumber()}, Saldo: ${account.getBalance()}`);
      });
    });
  }

  manageCustomer(customer: Customer): void {
    const existingCustomer = this.customers.find(c => c.getId() === customer.getId());
    if (existingCustomer) {
      console.log(`Atualizando cliente: ${customer.getName()}`);
      existingCustomer.updateCustomer();
    } else {
      console.log(`Adicionando novo cliente: ${customer.getName()}`);
      this.customers.push(customer);
      customer.newCustomer();
    }
  }

  // approveCustomerCredit(credit: Credit): void {
  //   const customer = this.customers.find(c => c.getId() === credit.getCustomerId());
  //   if (customer) {
  //     console.log(`Aprovando crédito para cliente: ${customer.getName()}`);
  //     customer.getCreditHistory().push(credit);
  //   } else {
  //     console.log("Cliente não encontrado para aprovação de crédito.");
  //   }
  // }
}
