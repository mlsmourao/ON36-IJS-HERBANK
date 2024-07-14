export interface Transaction {
    id: string;
    type: string;
    amount: number;
    date: Date;
    status: string;
  }
  
  export function recordTransaction(transaction: Transaction): void {
    // Implementar lógica para registrar transação
  }
  
  export function checkTransaction(transactionId: string): Transaction {
    // Implementar lógica para verificar detalhes de uma transação específica
    return {} as Transaction;
  }
  