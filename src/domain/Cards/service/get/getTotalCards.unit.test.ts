import { getTotalCards } from "./getTotalCards";
import { HttpClient } from "../../../../infra/HttpClient";

jest.mock("../../../../infra/HttpClient");

describe("getTotalCards", () => {
  it("should be defined", () => {
    expect(getTotalCards).toBeDefined();
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

    const response = await getTotalCards();
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
      await getTotalCards();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toStrictEqual(new Error("Error to get total cards"));
    }
  });
});
