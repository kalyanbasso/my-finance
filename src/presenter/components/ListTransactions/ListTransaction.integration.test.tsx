import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ListTransactions } from "./ListTransactions";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";

describe("ListTransactions", () => {
  const deleteTransaction = jest.fn();
  const editTransaction = jest.fn();
  const transactions: TransactionDataTypes[] = [
    {
      id: "1",
      title: "title",
      amount: 100,
      type: "income",
      category: "category test",
      date: new Date("2023-02-02T00:00:00"),
    },
    {
      id: "2",
      title: "title",
      amount: 101,
      type: "income",
      category: "category",
      date: new Date("2023-02-03T00:00:00"),
    },
  ];

  it("should render ListTransactions", () => {
    render(
      <ListTransactions
        delete={deleteTransaction}
        edit={editTransaction}
        list={transactions}
      />
    );

    expect(screen.getByText("R$ 100,00")).toBeTruthy();
    expect(screen.getByText("02/02/2023")).toBeTruthy();
    expect(screen.getByText("category")).toBeTruthy();
  });

  it("should handle modal", () => {
    render(
      <ListTransactions
        delete={deleteTransaction}
        edit={editTransaction}
        list={transactions}
      />
    );

    const button = screen.getAllByTestId("edit-button")[0];

    fireEvent.press(button);

    const modal = screen.getByTestId("modal");
    expect(modal).toBeTruthy();
  });

  it("should render outcome transaction", () => {
    const transaction: TransactionDataTypes = {
      id: "1",
      title: "title",
      amount: -100,
      type: "outcome",
      category: "category",
      date: new Date("2023-02-02T00:00:00"),
    };

    render(
      <ListTransactions
        delete={deleteTransaction}
        edit={editTransaction}
        list={[transaction]}
      />
    );

    expect(screen.getByText("R$ -100,00")).toBeTruthy();
  })

  it("should render income transaction", () => {
    const transaction: TransactionDataTypes = {
      id: "1",
      title: "title",
      amount: 100,
      type: "income",
      category: "category",
      date: new Date("2023-02-02T00:00:00"),
    };

    render(
      <ListTransactions
        delete={deleteTransaction}
        edit={editTransaction}
        list={[transaction]}
      />
    );

    expect(screen.getByText("R$ 100,00")).toBeTruthy();
  })
});
