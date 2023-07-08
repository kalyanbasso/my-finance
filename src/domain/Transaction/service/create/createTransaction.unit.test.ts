import { createTransaction } from "./createTransaction";
import { HttpClient } from "../../../../infra/HttpClient";
import { TransactionDataTypes } from "../../../../entity/Transaction/TransactionEntity";

jest.mock("../../../../infra/HttpClient");

describe("createTransaction", () => {
  it("should be defined", () => {
    expect(createTransaction).toBeDefined();
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

    const data: TransactionDataTypes = {
      id: "1",
      title: "test",
      amount: 100,
      date: new Date("2023-07-07T00:00:00"),
      category: "test",
      type: "income",
    };

    HttpClient.prototype.post = jest.fn().mockResolvedValue(mockResponse);

    const response = await createTransaction(data);
    expect(response).toBeUndefined();
  });

    it("should return error", async () => {
        HttpClient.prototype.post = jest.fn().mockRejectedValue(new Error());
        try {
            await createTransaction({} as TransactionDataTypes)
        } catch (error) {
            expect(error).toBeDefined();
            expect(error).toStrictEqual(new Error("Error to create transaction"));
        }
    })
});
