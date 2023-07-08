import { getListTransactions } from "./getListTransactions";
import { HttpClient } from "../../../../infra/HttpClient";

jest.mock("../../../../infra/HttpClient");

describe("getListTransaction", () => {
  it("should be defined", () => {
    expect(getListTransactions).toBeDefined();
  });

  it("should return response", async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          title: "test",
          amount: 100,
          date: new Date("2023-07-07T00:00:00"),
          category: "test",
          type: "income",
        },
      ],
    };

    HttpClient.prototype.get = jest.fn().mockResolvedValue(mockResponse);

    const response = await getListTransactions();
    expect(response).toBeDefined();
    expect(response).toStrictEqual({
      data: [
        {
          id: 1,
          title: "test",
          amount: 100,
          date: new Date("2023-07-07T00:00:00"),
          category: "test",
          type: "income",
        },
      ],
    });
  });

  it("should return error", async () => {
    HttpClient.prototype.get = jest.fn().mockRejectedValue(new Error());
    try {
      await getListTransactions();
    } catch (error) {
      expect(error).toStrictEqual(new Error("Error to get list transactions"));
    }
  });
});
