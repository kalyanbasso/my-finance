import React from "react";
import { render, screen } from "@testing-library/react-native";
import { EditTransactionForm } from "./editTransactionForm";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";

describe("EditTransactionForm", () => {
  it("should render EditTransactionForm", () => {
    const submit = jest.fn();
    const onClose = jest.fn();
    const deleteTransaction = jest.fn();
    const transaction: TransactionDataTypes = {
      id: "1",
      title: "title",
      amount: 100,
      type: "income",
      category: "category",
      date: new Date("2023-02-02T00:00:00"),
    };

    render(
      <EditTransactionForm
        deleteTransaction={deleteTransaction}
        onClose={onClose}
        submit={submit}
        transaction={transaction}
      />
    );

    expect(screen.getByText("Editar transação")).toBeTruthy();
    expect(screen.getByText(/Entrada/i)).toBeVisible();
    expect(screen.getByText(/Saída/i)).toBeVisible();
    expect(screen.getByText("Salvar")).toBeVisible();
  });
});
