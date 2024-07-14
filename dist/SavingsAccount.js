"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingsAccount = void 0;
const Account_1 = require("./Account");
class SavingsAccount extends Account_1.Account {
    constructor(id, balance, customerId, interestRate) {
        super(id, balance, customerId);
        this.interestRate = interestRate;
    }
    applyInterest() {
        this.balance += this.balance * this.interestRate;
    }
}
exports.SavingsAccount = SavingsAccount;
