import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { TransactionForm } from "./transactionForm";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";

describe("TransactionForm", () => {
  it("should apply the value in amount", () => {
    const submit = jest.fn();
    const onClose = jest.fn();

    render(<TransactionForm submit={submit} onClose={onClose} />);

    const input = screen.getByTestId("amount-input");
    fireEvent.changeText(input, "123");
    expect(input).toBeTruthy();
    expect(input).toHaveProp("value", "R$ 1,23");
  });

  it("should apply the value in title", () => {
    const submit = jest.fn();
    const onClose = jest.fn();

    render(<TransactionForm submit={submit} onClose={onClose} />);

    const input = screen.getByTestId("title-input");
    fireEvent.changeText(input, "title");
    expect(input).toBeTruthy();
    expect(input).toHaveProp("value", "title");
  });

  it("should apply the value in category", () => {
    const submit = jest.fn();
    const onClose = jest.fn();

    render(<TransactionForm submit={submit} onClose={onClose} />);

    const input = screen.getByTestId("category-input");
    fireEvent.changeText(input, "category");
    expect(input).toBeTruthy();
    expect(input).toHaveProp("value", "category");
  });

  it("should handle submit transaction", () => {
    const submit = jest.fn();
    const onClose = jest.fn();

    render(<TransactionForm submit={submit} onClose={onClose} />);

    const titleInput = screen.getByTestId("title-input");
    const amountInput = screen.getByTestId("amount-input");
    const categoryInput = screen.getByTestId("category-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.changeText(titleInput, "New Transaction");
    fireEvent.changeText(amountInput, "200");
    fireEvent.changeText(categoryInput, "New Category");
    fireEvent.press(submitButton);

    expect(submit).toHaveBeenCalled();
  });

  it("should call submit with form data when transaction is not defined", () => {
    const submit = jest.fn();
    const onClose = jest.fn();
    const formData = {
      title: "New Transaction",
      amount: 200,
      category: "Category",
      type: "income",
    };

    render(<TransactionForm submit={submit} onClose={onClose} />);
    
    fireEvent.changeText(screen.getByTestId("title-input"), formData.title);
    fireEvent.changeText(
      screen.getByTestId("amount-input"),
      formData.amount.toString()
    );
    fireEvent.changeText(
      screen.getByTestId("category-input"),
      formData.category
    );
    fireEvent.press(screen.getByTestId("submit-button"));

    expect(submit).toHaveBeenCalledWith(formData);
  });

  it("should call editTransaction with editedTransaction when transaction and editTransaction are defined", () => {
    const transaction: TransactionDataTypes = {
      id: "1",
      title: "Transaction",
      amount: 100,
      type: "income",
      category: "Category",
      date: new Date("2023-02-02T00:00:00"),
    };
    const editTransaction = jest.fn();
    const onClose = jest.fn();
    const editedTransaction = { ...transaction, title: "Edited Transaction" };

    render(
      <TransactionForm
        transaction={transaction}
        editTransaction={editTransaction}
        onClose={onClose}
      />
    );

    fireEvent.changeText(
      screen.getByTestId("title-input"),
      "Edited Transaction"
    );
    fireEvent.press(screen.getByTestId("submit-button"));

    expect(editTransaction).toHaveBeenCalledWith(editedTransaction);
  });

  it("should not set errors when isValid.success is true", () => {
    const onClose = jest.fn();
    const submit = jest.fn();

    render(<TransactionForm submit={submit} onClose={onClose} />);

    fireEvent.changeText(screen.getByTestId("title-input"), null);
    fireEvent.press(screen.getByTestId("submit-button"));

    expect(screen.queryByText("Campo obrigatório")).toBeNull();
  });

  it("should handle type buttons", () => {
    const onClose = jest.fn();
    const submit = jest.fn();

    render(<TransactionForm submit={submit} onClose={onClose} />);

    fireEvent.press(screen.getByTestId("income-button"));
    expect(screen.getByTestId("income-button")).toHaveStyle({
      borderColor: "#33CC95",
    });
    fireEvent.press(screen.getByTestId("outcome-button"));
    expect(screen.getByTestId("outcome-button")).toHaveStyle({
      borderColor: "#E52E4D",
    });
  });

  it("should handle delete button", () => {
    const onClose = jest.fn();
    const submit = jest.fn();
    const deleteTransaction = jest.fn();
    const transaction: TransactionDataTypes = {
      id: "1",
      title: "Transaction",
      amount: 100,
      type: "income",
      category: "Category",
      date: new Date("2023-02-02T00:00:00"),
    };

    render(
      <TransactionForm
        submit={submit}
        onClose={onClose}
        deleteTransaction={deleteTransaction}
        transaction={transaction}
      />
    );

    fireEvent.press(screen.getByTestId("delete-button"));
    expect(deleteTransaction).toHaveBeenCalled();
  })
});
