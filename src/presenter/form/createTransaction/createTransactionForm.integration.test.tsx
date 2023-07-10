import React from "react";
import { render, screen } from "@testing-library/react-native";
import { CreateTransactionForm } from "./createTransactionForm";

describe("CreateTransactionForm", () => {
  it("should render CreateTransactionForm", () => {
    const submit = jest.fn();
    const onClose = jest.fn();

    render(<CreateTransactionForm submit={submit} onClose={onClose} />);

    expect(screen.getByText(/Cadastrar transação/i)).toBeVisible();
    expect(screen.getByText(/Entrada/i)).toBeVisible();
    expect(screen.getByText(/Saída/i)).toBeVisible();
    expect(screen.getByText("Cadastrar")).toBeVisible();
  });
});
