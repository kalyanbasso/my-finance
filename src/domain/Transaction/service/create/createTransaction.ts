import { TransactionDataType } from "../../../../entity/Transaction/TransactionEntity";
import { HttpClient } from "../../../../infra/HttpClient";

export async function createTransaction(transaction: TransactionDataType) {
  try {
    const httpClient = new HttpClient();
    await httpClient.post("/transaction", transaction);
  } catch {
    throw new Error("Error to create transaction");
  }
}
