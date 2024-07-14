"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAccount = openAccount;
exports.getStatement = getStatement;
exports.deposit = deposit;
exports.withdraw = withdraw;
exports.payBill = payBill;
exports.receivePension = receivePension;
function openAccount(customer, type) {
    // Implementar lógica para abrir uma nova conta
    return {};
}
function getStatement(account) {
    // Implementar lógica para retornar extrato da conta
    return account.transactions;
}
function deposit(account, amount) {
    // Implementar lógica para realizar depósito na conta
}
function withdraw(account, amount) {
    // Implementar lógica para realizar saque na conta
}
function payBill(account, amount) {
    // Implementar lógica para pagar uma conta
}
function receivePension(account, amount) {
    // Implementar lógica para facilitar recebimento de aposentadorias
}
