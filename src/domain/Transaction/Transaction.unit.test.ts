import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";
import { Transaction } from "./Transaction";

describe("Transaction", () => {
  const getCardsSpy = jest.fn();
  const createTransactionSpy = jest.fn();
  const deleteTransactionSpy = jest.fn();
  const updateTransactionSpy = jest.fn();

  const cards = new Transaction(
    getCardsSpy,
    createTransactionSpy,
    deleteTransactionSpy,
    updateTransactionSpy
  );

  it("should be defined", () => {
    expect(Transaction).toBeDefined();
  });

  it("should get list", async () => {
    const array: TransactionDataTypes[] = [
      {
        id: "1",
        title: "test",
        amount: 100,
        date: new Date("2023-07-07T00:00:00"),
        category: "test",
        type: "income",
      },
    ];

    getCardsSpy.mockReturnValue(Promise.resolve(array));

    const response = await cards.list();
    const count = cards.count;
    const getList = cards.getList;

    expect(response).toStrictEqual(array);
    expect(count).toBe(1);
    expect(getList).toStrictEqual(array);
  });

  it("should create a transaction", async () => {
    const transaction: TransactionDataTypes = {
      id: "1",
      title: "test",
      amount: 100,
      date: new Date("2023-07-07T00:00:00"),
      category: "test",
      type: "income",
    };

    createTransactionSpy.mockReturnValue(Promise.resolve(transaction));

    await cards.create(transaction);

    expect(createTransactionSpy).toHaveBeenCalledTimes(1);
  });

  it("should return undefined on error in create a transaction", async () => {
    createTransactionSpy.mockReturnValue(Promise.resolve(undefined));

    await cards.create({} as TransactionDataTypes);

    expect(createTransactionSpy).toHaveBeenCalledTimes(1);
  });

  it("should delete a transaction", async () => {
    deleteTransactionSpy.mockReturnValue(Promise.resolve(true));

    await cards.delete("1");

    expect(deleteTransactionSpy).toHaveBeenCalledTimes(1);
  });

  it("should update a transaction", async () => {
    const transaction: TransactionDataTypes = {
      id: "1",
      title: "test",
      amount: 100,
      date: new Date("2023-07-07T00:00:00"),
      category: "test",
      type: "income",
    };

    updateTransactionSpy.mockReturnValue(Promise.resolve(transaction));

    await cards.update(transaction);

    expect(updateTransactionSpy).toHaveBeenCalledTimes(1);
  });

  it("should return undefined on error in update a transaction", async () => {
    updateTransactionSpy.mockReturnValue(Promise.resolve(undefined));

    await cards.update({} as TransactionDataTypes);

    expect(updateTransactionSpy).toHaveBeenCalledTimes(1);
  });
});
