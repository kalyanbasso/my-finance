import { Transaction } from "./Transaction";
import { getListTransactions } from "./service/get/getListTransactions";
import { createTransaction } from "./service/create/createTransaction";

export class FactoryTransaction {
  execute() {
    const transaction = new Transaction(getListTransactions, createTransaction);
    return transaction;
  }
}
