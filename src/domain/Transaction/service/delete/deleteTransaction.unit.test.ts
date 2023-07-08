import { deleteTransaction } from "./deleteTransaction";
import { HttpClient } from "../../../../infra/HttpClient";

jest.mock("../../../../infra/HttpClient");

describe("deleteTransaction", () => {
  it("should be defined", () => {
    expect(deleteTransaction).toBeDefined();
  });

  it("should return response", async () => {
    HttpClient.prototype.delete = jest.fn().mockResolvedValue({});

    const id = "1";

    const response = await deleteTransaction(id);
    expect(response).toBeUndefined();
  });

  it("should return error", async () => {
    HttpClient.prototype.delete = jest.fn().mockRejectedValue(new Error());
    try {
      const id = "1";

      await deleteTransaction(id);
    } catch (error) {
      expect(error).toStrictEqual(new Error("Error to delete transaction"));
    }
  });
});
