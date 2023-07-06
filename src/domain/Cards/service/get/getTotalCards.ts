import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";
import { HttpClient } from "../../../../infra/HttpClient";

export async function getTotalCards() {
  try {
    const httpClient = new HttpClient();
    const response = await httpClient.get<TransactionDataTypes[]>(
      "/transaction"
    );
    return response;
  } catch (error) {
    throw new Error("Error to get total cards");
  }
}
