import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";
import { HttpClient } from "../../../../infra/HttpClient";

export async function updateTransaction(transaction: TransactionDataTypes) {
  try {
    console.log(`/transaction/${transaction.id}`);
    const httpClient = new HttpClient();
    await httpClient.put(`/transaction/${transaction.id}`, transaction);
  } catch (error) {
    throw new Error("Error to update transaction");
  }
}
