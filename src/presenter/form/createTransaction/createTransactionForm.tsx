import React from "react";
import { TransactionForm, FormTypes } from "../transactionForm/transactionForm";

export function CreateTransactionForm({
  onClose,
  submit,
}: {
  onClose: () => void;
  submit: (data: FormTypes) => void;
}) {
  return (
    <TransactionForm onClose={onClose} submit={submit} />
  );
}
