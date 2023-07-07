import React from "react";
import { TransactionForm, FormTypes } from "../transactionForm/transactionForm";
import { TransactionDataTypes } from "../../../entity/Transaction/TransactionEntity";

export function EditTransactionForm({
  onClose,
  transaction,
  submit,
  deleteTransaction,
}: {
  onClose: () => void;
  transaction: TransactionDataTypes;
  submit: (data: TransactionDataTypes) => void;
  deleteTransaction: (id: string) => void;
}) {
  return (
    <TransactionForm
      onClose={onClose}
      editTransaction={submit}
      deleteTransaction={deleteTransaction}
      transaction={transaction}
    />
  );
}