import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";
import { HttpClient } from "../../../../infra/HttpClient";

export async function createTransaction(transaction: TransactionDataTypes) {
  try {
    const httpClient = new HttpClient();
    await httpClient.post("/transaction", transaction);
  } catch {
    throw new Error("Error to create transaction");
  }
}
