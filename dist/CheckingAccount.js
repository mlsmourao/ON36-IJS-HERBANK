"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckingAccount = void 0;
const Account_1 = require("./Account");
class CheckingAccount extends Account_1.Account {
    constructor(id, balance, customerId, overdraftLimit) {
        super(id, balance, customerId);
        this.overdraftLimit = overdraftLimit;
    }
    withdraw(amount) {
        if (amount <= this.balance + this.overdraftLimit) {
            this.balance -= amount;
        }
        else {
            throw new Error('Insufficient funds');
        }
    }
}
exports.CheckingAccount = CheckingAccount;
