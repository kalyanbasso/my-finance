import { Transaction } from "./Transaction";
import { getListTransactions } from "./service/get/getListTransactions";
import { createTransaction } from "./service/create/createTransaction";
import { deleteTransaction } from "./service/delete/deleteTransaction";
import { updateTransaction } from "./service/update/updateTransaction";

export class FactoryTransaction {
  execute() {
    const transaction = new Transaction(
      getListTransactions,
      createTransaction,
      deleteTransaction,
      updateTransaction
    );
    return transaction;
  }
}
