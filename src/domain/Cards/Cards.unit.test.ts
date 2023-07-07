import { TransactionDataTypes } from "../../entity/Transaction/TransactionEntity";
import { Cards } from "./Cards";

describe("Cards", () => {
  it("should be defined", () => {
    expect(Cards).toBeDefined();
  });

  it("should format a Cards array (only income)", () => {
    const getCardsSpy = jest.fn();
    const cards = new Cards(getCardsSpy);
    const array: TransactionDataTypes[] = [
      {
        id: "1",
        title: "test",
        amount: 100,
        date: new Date("2023-07-07T00:00:00"),
        category: "test",
        type: "income",
      },
      {
        id: "1",
        title: "test",
        amount: 100,
        date: new Date("2023-07-08T00:00:00"),
        category: "test",
        type: "income",
      },
    ];

    cards.formatCards(array);

    const income = cards.income;
    const outcome = cards.outcome;
    const total = cards.totalBalance;

    const incomeExpected = {
      value: "R$ 200,00",
      text: "Ultima entrada em 08 de julho",
    };

    const outcomeExpected = {
      value: "R$ 0,00",
      text: "Nenhuma saída cadastrada",
    };

    const totalExpected = {
      value: "R$ 200,00",
      text: "07 à 08 de julho",
    };
    expect(income).toStrictEqual(incomeExpected);
    expect(outcome).toStrictEqual(outcomeExpected);
    expect(total).toStrictEqual(totalExpected);
  });

  it("should format a Cards array (only outcome)", () => {
    const getCardsSpy = jest.fn();
    const cards = new Cards(getCardsSpy);
    const array: TransactionDataTypes[] = [
      {
        id: "1",
        title: "test",
        amount: -100,
        date: new Date("2023-07-07T00:00:00"),
        category: "test",
        type: "outcome",
      },
      {
        id: "2",
        title: "test",
        amount: -100,
        date: new Date("2023-07-06T00:00:00"),
        category: "test",
        type: "outcome",
      },
      {
        id: "2",
        title: "test",
        amount: -100,
        date: new Date("2023-07-08T00:00:00"),
        category: "test",
        type: "outcome",
      },
    ];

    cards.formatCards(array);

    const income = cards.income;
    const outcome = cards.outcome;
    const total = cards.totalBalance;

    const incomeExpected = {
      value: "R$ 0,00",
      text: "Nenhuma entrada cadastrada",
    };

    const outcomeExpected = {
      value: "R$ -300,00",
      text: "Ultima saída em 08 de julho",
    };

    const totalExpected = {
      value: "R$ -300,00",
      text: "06 à 08 de julho",
    };
    expect(income).toStrictEqual(incomeExpected);
    expect(outcome).toStrictEqual(outcomeExpected);
    expect(total).toStrictEqual(totalExpected);
  });

  it("should create a new Cards", async () => {
    const getCardsSpy = jest.fn();
    const cards = new Cards(getCardsSpy);
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

    await cards.getCards();

    const income = cards.income;
    const outcome = cards.outcome;
    const total = cards.totalBalance;

    const incomeExpected = {
      value: "R$ 100,00",
      text: "Ultima entrada em 07 de julho",
    };

    const outcomeExpected = {
      value: "R$ 0,00",
      text: "Nenhuma saída cadastrada",
    };

    const totalExpected = {
      value: "R$ 100,00",
      text: "07 à 07 de julho",
    };
    expect(income).toStrictEqual(incomeExpected);
    expect(outcome).toStrictEqual(outcomeExpected);
    expect(total).toStrictEqual(totalExpected);

    expect(getCardsSpy).toHaveBeenCalledTimes(1);
  });

  it("should return undefined when response is empty", async () => {
    const getCardsSpy = jest.fn();
    const cards = new Cards(getCardsSpy);

    getCardsSpy.mockReturnValue(Promise.resolve([]));

    const response = await cards.getCards();

    expect(response).toBeUndefined();
    expect(getCardsSpy).toHaveBeenCalledTimes(1);
  });
});
     