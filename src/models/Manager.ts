import { Customer } from "./Customer";
import { Credit } from "./Credit";

export class Manager {
  private id: number;
  private fullName: string;
  private customers: Customer[];

  constructor(id: number, fullName: string, customers: Customer[]) {
    this.id = id;
    this.fullName = fullName;
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
    this.generateAccountReport();
  }

  weeklyAccountReport(): void {
    console.log("Relatório semanal das contas:");
    this.generateAccountReport();
  }

  private generateAccountReport(): void {
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
      existingCustomer.updateCustomer({
        fullName: customer.getName(),
        birthDate: customer.getBirthDate(),
        cpf: customer.getCpf(),
        address: customer.getAddress(),
        phoneNumbers: customer.getPhoneNumbers(),
        email: customer.getEmail(),
        creditHistory: customer.getCreditHistory(),
        accounts: customer.getAccounts(),
        manager: customer.getManager()
      });
    } else {
      console.log(`Adicionando novo cliente: ${customer.getName()}`);
      this.customers.push(customer);
      customer.newCustomer();
    }
  }

  approveCustomerCredit(credit: Credit): void {
    const customer = this.customers.find(c => c.getId() === credit.getAccount().getId());

    if (customer) {
      console.log(`Aprovando crédito para cliente: ${customer.getName()}`);
      customer.getCreditHistory().push(credit);
    } else {
      console.log("Cliente não encontrado para aprovação de crédito.");
    }
  }
}
