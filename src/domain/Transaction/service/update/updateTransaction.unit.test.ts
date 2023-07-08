import { updateTransaction } from "./updateTransaction";
import { HttpClient } from "../../../../infra/HttpClient";
import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";

jest.mock("../../../../infra/HttpClient");

describe("updateTransaction", () => {
  it("should be defined", () => {
    expect(updateTransaction).toBeDefined();
  });

  it("should return response", async () => {
    const mockResponse = {
      data: {
        id: "1",
        title: "test",
        amount: 100,
        date: new Date("2023-07-07T00:00:00"),
        category: "test",
        type: "income",
      },
    };

    HttpClient.prototype.put = jest.fn().mockResolvedValue(mockResponse);

    const data: TransactionDataTypes = {
      id: "1",
      title: "test",
      amount: 100,
      date: new Date("2023-07-07T00:00:00"),
      category: "test",
      type: "income",
    };

    const response = await updateTransaction(data);
    expect(response).toBeUndefined();
  });

    it("should return error", async () => {
        HttpClient.prototype.put = jest.fn().mockRejectedValue(new Error());
        try {
            await updateTransaction({} as TransactionDataTypes)
        } catch (error) {
            expect(error).toBeDefined();
            expect(error).toStrictEqual(new Error("Error to update transaction"));
        }
    })
});
