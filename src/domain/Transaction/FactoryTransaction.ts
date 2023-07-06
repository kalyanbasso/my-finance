import { Transaction } from "./Transaction";
import { getListTransactions } from "./service/get/getListTransactions";
import { createTransaction } from "./service/create/createTransaction";
import { deleteTransaction } from "./service/delete/deleteTransaction";

export class FactoryTransaction {
  execute() {
    const transaction = new Transaction(
      getListTransactions,
      createTransaction,
      deleteTransaction
    );
    return transaction;
  }
}
