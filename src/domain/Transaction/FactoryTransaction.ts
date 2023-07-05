import { Transaction } from "./Transaction";
import { getListTransactions } from "./service/get/getListTransactions";

export class FactoryTransaction {
  execute() {
    const transaction = new Transaction(
        getListTransactions
    );
    return transaction;
  }
}
