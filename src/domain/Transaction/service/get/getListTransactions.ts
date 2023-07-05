import { TransactionDataType } from "../../../../entity/Transaction/TransactionEntity";
import { HttpClient } from "../../../../infra/HttpClient";

export async function getListTransactions() {
  try {
    const httpClient = new HttpClient();
    const response = await httpClient.get<TransactionDataType[]>(
      "/transaction"
    );
    return response;
  } catch (error) {
    throw new Error("Error to get list transactions");
  }
}
